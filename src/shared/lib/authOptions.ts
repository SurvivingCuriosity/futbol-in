import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "./db";
import { NextAuthOptions } from "next-auth";
import { User } from "../models/User/User.model";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
    
        // Busca el usuario en la base de datos
        const user = await User.findOne({ email: credentials?.email });
    
        if (!user) {
          throw new Error("No existe el usuario");
        }
    
        // Verifica password
        const isPasswordValid = bcrypt.compareSync(
          credentials?.password || "",
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Contraseña inválida");
        }
    
        // Devuelve la información del usuario que quieras incluir en la sesión
        // (OJO: esto es lo que recibirá "user" en la callback 'jwt' inmediatamente después)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          imagen: user.imagen,
          status: user.status,
          role: user.role,
          provider: user.provider,
          // createdAt, si te interesa también
        };
      },
    }),
  ],
  callbacks: {
    /**
     * 1) La primera vez que el usuario inicia sesión con credenciales o Google, NextAuth recibe
     *    los datos de ese usuario como 'user'.
     * 2) En las siguientes veces que NextAuth verifique el token en peticiones subsecuentes,
     *    'user' será undefined, pero 'token' tendrá los datos anteriores.
     */
    async jwt({ token, user }) {
      // Si 'user' está presente, quiere decir que es la 1ª vez (login).
      // Guardamos todo lo que nos interesa en el token.
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          imagen: user.imagen,
          role: user.role,
          status: user.status,
          provider: user.provider,
        };
      }

      // Si no hay 'user', simplemente devolvemos el token actual (ya tiene los datos previos)
      return token;
    },

    /**
     * Cada vez que corras useSession(), getSession(), getServerSession(), NextAuth llama a 'session'.
     * Lo que retornes aquí será la 'session' final en el cliente.
     */
    async session({ session, token }) {
      // session.user suele tener por defecto { name, email, image }
      // Vamos a meterle todo lo que guardamos en el token
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.imagen = token.imagen;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.provider = token.provider;
        // etc.
      }
      return session;
    },
  },
};
