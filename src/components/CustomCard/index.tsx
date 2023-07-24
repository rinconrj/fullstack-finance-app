import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CustomCard({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) {
  return (
    <Card className={className || "m-6 h-40 w-60"}>
      <CardBody>
        <div className="relative flex w-full flex-col ">
          <div className="relative mb-[-100px] mr-[-56px] mt-[-64px] flex flex-col items-start gap-12 rounded-[50%] border border-solid border-white/25 px-5 pb-32 pt-20">
            <Typography className="absolute left-5 top-32 h-6 w-56 font-medium leading-[24px] tracking-[0.08] text-white/75">
              {title}
            </Typography>
            <div className="flex w-3/5 flex-row items-center gap-2 border-solid">
              <Typography className="my-0 w-32 text-3xl font-semibold tracking-[0.28] text-white">
                {value}
              </Typography>
            </div>
          </div>
        </div>
      </CardBody>
      {/* <CardFooter>
      </CardFooter> */}
    </Card>
  );
}
