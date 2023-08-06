import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import prismadb from "./prismadb"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) {
          return null
        }
        const comparedPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!comparedPassword) {
          return null
        }
        return user
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prismadb.user.findUnique({
        where: {
          email: token.email!,
        },
      })
      if (!dbUser) {
        token.id = user!.id
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      }
    },
  },
}
