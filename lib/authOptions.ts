// src/lib/authOptions.ts
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

// Define custom types for token and session user
interface CustomToken {
  id?: string;
  username?: string;
  email?: string;
  isPremium?: boolean;
}

interface CustomSessionUser extends User {
  id: string;
  username: string;
  email: string;
  isPremium: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) throw new Error("No user found");

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) throw new Error("Invalid password.");

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Cast session.user to CustomSessionUser type
      const user = session.user as CustomSessionUser;

      if (token?.sub) {
        user.id = token.sub as string;
        user.username = (token as CustomToken).username ?? "";
        user.email = (token as CustomToken).email ?? "";
        user.isPremium = (token as CustomToken).isPremium ?? false;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        const existingUser = await prisma.user.findFirst({
          // @ts-ignore
          where: { email: profile.email },
        });

        if (!existingUser) {
          const randomPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
          let username =
            profile.name || `user_${Math.random().toString(36).slice(2, 8)}`;
          const usernameExists = await prisma.user.findFirst({
            where: { username },
          });
          if (usernameExists) {
            // If username exists, append a random string or number to make it unique
            username = `${username}_${Math.random().toString(36).slice(2, 6)}`;
          }
          const newUser = await prisma.user.create({
            data: {
              // @ts-ignore
              email: profile.email,
              // @ts-ignore
              username:username,
              isPremium: false,
              password: hashedPassword,
            },
          });

          user.id = newUser.id;
          user.username = newUser.username;
          user.email = newUser.email;
          user.isPremium = newUser.isPremium;
        } else {
          user.id = existingUser.id;
          user.username = existingUser.username;
          user.email = existingUser.email;
          user.isPremium = existingUser.isPremium;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
