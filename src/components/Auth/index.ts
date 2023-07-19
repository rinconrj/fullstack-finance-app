import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";

export async function protectRoute(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
