import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
          try{

            await connectDb();
            
            const user = await User.findOne({ email: credentials?.email });
            console.error('====')
            console.log(credentials?.password)
            console.log(user?.password)
            if (
                !user ||
                !bcrypt.compareSync(credentials?.password || "", user.password)
            ) {
                console.log(credentials?.password)
                console.log(user?.password)
                console.error('ha entrado aqui')
                throw new Error("Invalid email or password");
            }
            
            return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
            console.error(error)
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};
