import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthProvider } from "../enum/User/AuthProvider";
import { UserStatus } from "../enum/User/Status";
import { User } from "../models/User/User.model";
import connectDb from "./db";

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
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDb();

        const email = user.email;
        let existingUser = await User.findOne({ email });

        if (!existingUser) {
          existingUser = new User({
            email,
            status: UserStatus.MUST_CREATE_USERNAME,
            provider: AuthProvider.GOOGLE,
          });
          await existingUser.save();
        }
        user.name = existingUser.name;
        user.id = existingUser._id.toString();
        user.status = existingUser.status;
      }
      
      return true;
    },
    /**
     * 1) La primera vez que el usuario inicia sesión con credenciales o Google, NextAuth recibe
     *    los datos de ese usuario como 'user'.
     * 2) En las siguientes veces que NextAuth verifique el token en peticiones subsecuentes,
     *    'user' será undefined, pero 'token' tendrá los datos anteriores.
     */
    async jwt({ token, user }) {
      if (user) {
        // user es la info que devolviste en "signIn" o "authorize"
        token.id = user.id;
        token.status = user.status;
        token.email = user.email;
        token.name = user.name;
        token.provider = user.provider;
        token.imagen = user.image || '';
      }
      return token;
    },

    /**
     * Cada vez que corras useSession(), getSession(), getServerSession(), NextAuth llama a 'session'.
     * Lo que retornes aquí será la 'session' final en el cliente.
     */
    async session({ session, token }) {
      // 1) Conectar a la BD
      await connectDb();
    
      // 2) Buscar en la BD el usuario por su ID
      //    (el ID lo guardaste en token.id durante la callback "jwt")
      const dbUser = await User.findById(token.id);
    
      if (dbUser) {
        if(session.user){

          // 3) Forzar que "session.user" refleje lo que hay en la BD
          session.user.id = dbUser._id.toString();
          session.user.name = dbUser.name;
          session.user.status = dbUser.status; // si lo cambiaste a DONE, lo verás aquí
          session.user.imagen = token.imagen;
        }
      } else {
        if(session.user){
          
          // 4) Si no hay usuario en la BD, usa lo del token por fallback
          session.user.id = token.id as string;
          session.user.status = token.status as UserStatus;
          session.user.provider = token.provider as AuthProvider;
          session.user.imagen = token.image as string;
          // etc.
        }
      }
    
      return session;
    },
  },
};
