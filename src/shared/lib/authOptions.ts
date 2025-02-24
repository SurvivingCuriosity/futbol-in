import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthProvider } from "../enum/User/AuthProvider";
import { UserStatus } from "../enum/User/Status";
import { User } from "../models/User/User.model";
import { UserService } from "../services/User/UserService";
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

        const user = await UserService.findByEmail(credentials?.email || "");

        if (!user) {
          throw new Error("No existe el usuario");
        }

        const isPasswordValid = await UserService.validatePassword(
          credentials!.password,
          user.password || ""
        );

        if (!isPasswordValid) {
          throw new Error("Contraseña inválida");
        }

        // Esto es lo que recibirá "user" en el callback 'jwt' inmediatamente después
        return UserService.mapToDTO(user);
      },
    }),
  ],
  callbacks: {
    // Para determinar si un usuario accede o no
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        let existingUser = await UserService.findByEmail(user.email);
        
        if (!existingUser) {
          existingUser = await UserService.createGoogleUser(user.email);
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
        token.imagen = user.image || "";
      }
      return token;
    },

    /**
     * Se ejecuta cada vez que se llama a getSession getServerSession etc.
     * Me permite obtener la última version del usuario.
     */
    async session({ session, token }) {
      await connectDb();

      const dbUser = await User.findById(token.id);

      if (session.user && dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.name = dbUser.name;
        session.user.status = dbUser.status;
        session.user.imagen = token.imagen;
      }

      if (session.user && !dbUser) {
        session.user.id = token.id as string;
        session.user.status = token.status as UserStatus;
        session.user.provider = token.provider as AuthProvider;
        session.user.imagen = token.image as string;
      }

      return session;
    },
    // Se ejecuta cada vez que se redirige a un callback de next auth (en signin o singout)
    async redirect({ url, baseUrl }) {
      // Si la URL ya es local (empieza con baseUrl), respétala
      if (url.startsWith(baseUrl)) return url;

      // Si no, usa tu Home
      return baseUrl + "/";
    },
  },
};
