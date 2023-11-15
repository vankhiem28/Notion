"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        alt="error"
        src={"/error.png"}
        width={300}
        height={300}
        className="dark:hidden"
      ></Image>
      <Image
        alt="error"
        src={"/error-dark.png"}
        width={300}
        height={300}
        className="hidden dark:block"
      ></Image>
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button>
        <Link href={"/documents"}>Go Back</Link>
      </Button>
    </div>
  );
}

export default Error;
