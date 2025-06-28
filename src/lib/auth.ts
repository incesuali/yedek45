import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { User } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

declare module "next-auth" {
    interface Session {
      user: DefaultSession["user"] & {
        id: string;
        phone?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      };
    }
  }

declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      phone?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });

                if (user && user.password) {
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordValid) {
                        const name = (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.email;
                        return { ...user, name };
                    }
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.phone = (user as User).phone;
                token.firstName = (user as User).firstName;
                token.lastName = (user as User).lastName;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.phone = token.phone;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    }
}; 