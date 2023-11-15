"use client";
import React, { useMemo } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import Toolbar from "~/components/toolbar";
import Cover from "~/components/cover";
import { Skeleton } from "~/components/ui/skeleton";
import dynamic from "next/dynamic";

interface DocumentIdParops {
  params: {
    documentId: Id<"documents">;
  };
}

function DocumentId({ params }: DocumentIdParops) {
  const Editor = useMemo(() => dynamic(() => import("~/components/editor"), { ssr: false }), []);

  const update = useMutation(api.documents.update);

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const onChange = (data: string) => {
    update({ id: params.documentId, content: data });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]"></Skeleton>
            <Skeleton className="h-4 w-[80%]"></Skeleton>
            <Skeleton className="h-4 w-[60%]"></Skeleton>
            <Skeleton className="h-4 w-[40%]"></Skeleton>
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document}></Toolbar>
        <Editor editable={false} onChange={onChange} initialContent={document.content}></Editor>
      </div>
    </div>
  );
}

export default DocumentId;
