import Image from "next/image";
import React from "react";

function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex flex-col items-center">
        <div className="relative w-full h-[100px] sm:w-[600px] sm:h-[150px] md:h-[260px] md:w-[852px] lg:h-[260px] lg:w-[852px]">
          <Image src="/home-hero.png" fill alt="Documents" className="object-contain "></Image>
        </div>
        <div className="relative w-[300px] h-[200px] sm:w-[550px] sm:h-[350px] md:w-[700px] lg:w-[1022px] lg:h-[638px] border rounded-xl shadow-lg">
          <Image
            src="/sidekick-desktop-app.png"
            fill
            alt="Documents"
            className="rounded-xl  object-contain"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Heroes;
