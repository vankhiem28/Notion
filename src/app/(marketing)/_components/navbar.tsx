"use client";
import React from "react";
import { useScrollTop } from "~/hooks/use-scroll-top";
import { cn } from "~/lib/utils";
import Logo from "./logo";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Spinner from "~/components/spinner";
import Link from "next/link";

function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "navbar z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo width={100}></Logo>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-3">
        {/* <ModeToggle></ModeToggle> */}
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <p>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Notion free</Button>
            </SignInButton>
          </p>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}> Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/"></UserButton>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
