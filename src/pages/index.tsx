import { Typography } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

function RightScreen() {
  return (
    <div>
      <div className="bg-50%_50% absolute h-full w-1/2 rounded bg-[linear-gradient(200deg,_#8b5cf6_6%,#6366f1_150%)] bg-cover bg-no-repeat bg-blend-normal" />
      <div className="absolute left-0 top-0 flex h-[1001px] w-[998px] flex-col items-end rounded-[50%] border border-solid border-white/50 pb-[585px]">
        <div className="absolute left-64 top-0 h-[745px] w-[742px] rounded-[50%] border border-solid border-white/50" />
        <div className="mr-0 h-[415px] w-2/5 shrink-0 rounded-[50%] border border-solid border-white/50" />
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="m-0 flex flex-col items-center justify-center">
        <div className="h-6 w-[400px] text-center font-['Public_Sans'] leading-[24px] tracking-[0.08] text-[#667085]">
          Welcome back, please enter your details.
        </div>
        <div className="text-center font-['Public_Sans'] text-3xl font-semibold tracking-[0.07] text-[#667085]">
          <Typography className="text-center text-3xl">
            Welcome Back!
          </Typography>
        </div>
        <button
          className="mt-4 flex h-10 w-[400px] flex-row items-center justify-center gap-1 overflow-hidden rounded-lg border border-solid border-[#858d9d] px-32 py-2 "
          onClick={() => signIn("google")}
        >
          <img
            src="https://file.rendit.io/n/bxsCWOYt2zl7S7nTW6Kq.png"
            className="min-h-0 w-5 min-w-0 shrink-0 hover:cursor-pointer"
          />
          <div className="w-32 shrink-0 whitespace-nowrap font-['Public_Sans'] text-sm font-semibold leading-[20px] tracking-[0.07] text-[#667085] hover:cursor-pointer">
            Login with Google
          </div>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div className="m-0 flex h-full w-full bg-[#f9f9fc] p-0">
      <div className="w-1/2 sm:invisible md:invisible xs:invisible">
        <RightScreen />
      </div>
      <div className="w-1/2 sm:w-1 md:w-1 xs:w-1">
        <LoginScreen />
      </div>
    </div>
  );
}
