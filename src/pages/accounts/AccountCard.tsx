import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";
import classNames from "classnames";
import CloseIcon from '../../resources/img/icons/close.svg'

interface AccountCardProps {
  balance: number;
  onClick?: () => void;
  deleteCard: (id: string) => void
  style?: object;
  name?: string;
  logo?: string;
  color?: string;
  id: string;
}

export default function AccountCard({
  id,
  balance,
  name,
  logo,
  color,
  onClick,
  deleteCard,
  ...props
}: AccountCardProps) {
  return (
    <Card
      style={{ backgroundColor: color }}
      className={`over:bg-blue-600 mt-6 h-56 w-96 color-#fafaf9 shadow-sm shadow-gray`}
      {...props}
    >
      <CardBody className={"flex h-full items-center justify-center"}>
        <div
          className={classNames(
            "flex h-56 w-full flex-col items-start gap-2 overflow-hidden rounded-lg p-5 shadow-[0px_4px_30px_0px_rgba(46,_45,_116,_0.05)]"
          )}
        >
          <div className="flex w-full justify-between">
              <Image
                onClick={()=>deleteCard(id)}
                alt={"close logo"}
                src={CloseIcon}
                width={20}
                height={20}
                 style={{
                   backgroundColor: "white",
                   width:'20px',
                   height:'20px',
                   borderRadius:'4px',
                   boxShadow: "5px rgba(0,0,0,0.5)",
                 }}
                 className="hover:shadow-lg  cursor-pointer"
              />
                          {logo && (
              <Image
                alt={name || "image"}
                src={logo}
                width={50}
                height={50}
                style={{
                  backgroundColor: "white",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
                  transition: "all 0.3s ease",
                }}
              />
            )}

          </div>
          <div className="flex flex-row items-center gap-1 self-stretch">
            <Typography className="w-[300px]  font-bold leading-[24px] tracking-[0.08] text-white drop-shadow-lg">
              Total Balance
            </Typography>
          </div>
          <div onClick={onClick} className="mb-2 flex flex-row items-center  cursor-pointer gap-3">
            <Typography className="w-[112px] text-3xl font-semibold tracking-[0.32] text-[#1d1f2c]">
              {balance} R$
            </Typography>
          </div>
          <div className="mb-2 flex w-full flex-row items-center justify-between gap-1">
            <div className="flex w-12 shrink-0 flex-row items-center gap-px">
              <Typography className="w-3/5  text-lg font-bold capitalize leading-[19.6px] tracking-[0.07] text-white drop-shadow-lg">
                {name}
              </Typography>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
