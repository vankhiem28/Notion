"use client";

import React from "react";
import Navbar from "./_components/navbar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Spinner from "~/components/spinner";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"}></Spinner>
      </div>
    );
  }

  if (isAuthenticated) {
    return redirect("/documents");
  }

  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar></Navbar>
      <main className="h-full pt-32 sm:pt-32 md:pt-40">{children}</main>
    </div>
  );
}

export default MarketingLayout;
