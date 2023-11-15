"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

function DocumentsPage() {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note added successfully",
      error: "Failed to create a new note",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        alt="empty"
        width={300}
        height={300}
        className="dark:hidden"
      ></Image>
      <Image
        src={"/empty-dark.png"}
        alt="empty"
        width={300}
        height={300}
        className="hidden dark:block"
      ></Image>
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName} {user?.lastName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2"></PlusCircle>
        Create a note
      </Button>
    </div>
  );
}

export default DocumentsPage;
