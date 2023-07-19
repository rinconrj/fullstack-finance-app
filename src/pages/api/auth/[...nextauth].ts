import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }: any) {

      let userDb
      if (session.user.email && session.user.name) {
        userDb = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        if (!userDb) {
          userDb = await prisma.user.create({
            data: {
              email: session.user.email,
              name: session.user.name,
              provider: 'google',
            },
          });

        }
      }
      session.user = userDb;

      return session
    }
  }
});
