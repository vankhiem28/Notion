"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Spinner from "~/components/spinner";
import Navigation from "./_components/navigation";
import SearchCommand from "~/components/search-command";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"}></Spinner>
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <SearchCommand></SearchCommand>
      <Navigation></Navigation>
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}

export default MainLayout;
