import { IncomingMessage } from "http";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";


export const getServerAuthSession = ({ req }: { req: IncomingMessage }) => {
  return async (req: IncomingMessage) => {
    const session = await getSession({ req }) as Session | null;

    if (!session) {
      return null;
    }

    // Modify the return value based on your session structure
    return {
      session
    };
  };
};