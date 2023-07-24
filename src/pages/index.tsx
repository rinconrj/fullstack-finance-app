import { Grid, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function RightScreen() {
  return (
    <div className="absolute left-[-36.73828125px] top-[-20.9281005859375px] flex h-[1001px] w-[998px] flex-col items-start justify-end px-[335px] pb-[279px] pt-[576px]">
      <div className="bg-50%_50% absolute left-16 top-12 h-[896px] w-2/3 rounded bg-[linear-gradient(200deg,_#8b5cf6_6%,#6366f1_150%)] bg-cover bg-no-repeat bg-blend-normal" />
      <div className="absolute left-0 top-0 flex h-[1001px] w-[998px] flex-col items-end rounded-[50%] border border-solid border-white/50 pb-[585px]">
        <div className="absolute left-64 top-0 h-[745px] w-[742px] rounded-[50%] border border-solid border-white/50" />
        <div className="mr-0 h-[415px] w-2/5 shrink-0 rounded-[50%] border border-solid border-white/50" />
      </div>
      <div className="absolute left-[433.3926086425781px] top-0 flex h-[567px] w-3/5 flex-row items-start justify-end gap-3 rounded-[50%] border border-solid border-white/50 px-40 pt-12">
        <img
          src="https://file.rendit.io/n/Jr83nBkytQNPvdUlDhT0.svg"
          className="min-h-0 w-8 min-w-0 shrink-0"
        />
        <div className="mt-px w-20 shrink-0 font-['Public_Sans'] text-2xl font-semibold leading-[32px] tracking-[0.24] text-[#1d1f2c]">
          Pixlab
        </div>
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="h-6 w-[400px] text-center font-['Public_Sans'] leading-[24px] tracking-[0.08] text-[#667085]">
          Welcome back, please enter your details.
        </div>
        <div className="text-center font-['Public_Sans'] text-3xl font-semibold tracking-[0.07] text-[#667085]">
          <Typography className="text-center text-3xl">
            Welcome Back!
          </Typography>
        </div>
        <button
          className="mt-4 flex h-10 w-[400px] flex-row items-center justify-center gap-1 overflow-hidden rounded-lg border border-solid border-[#858d9d] px-32 py-2"
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
          }
        >
          <img
            src="https://file.rendit.io/n/bxsCWOYt2zl7S7nTW6Kq.png"
            className="min-h-0 w-5 min-w-0 shrink-0"
          />
          <div className="w-32 shrink-0 whitespace-nowrap font-['Public_Sans'] text-sm font-semibold leading-[20px] tracking-[0.07] text-[#667085]">
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
    <div className="flex h-full w-full bg-[#f9f9fc]">
      <div className="w-1/2">
        <RightScreen />
      </div>
      <div className="w-1/2">
        <LoginScreen />
      </div>
    </div>
  );
}
