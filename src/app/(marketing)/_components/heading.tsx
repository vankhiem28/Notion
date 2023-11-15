"use client";

import React from "react";

import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useConvexAuth } from "convex/react";
import Spinner from "~/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

interface Props {}

function Heading({}: Props) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, docs, & projects. Together. Welcome to <span className="underline">Notion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"}></Spinner>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href={"/documents"}>
            Enter Your Notion
            <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion free
            <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading;
