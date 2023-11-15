import React from "react";

import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

interface IProps {
  width?: number;
  height?: number;
}

function Logo({ width = 87, height = 30 }: IProps) {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src={"/logo-pr.svg"} alt="logo" width={width} height={height}></Image>
    </div>
  );
}

export default Logo;
