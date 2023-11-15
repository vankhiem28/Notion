"use client";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "~/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";
import { useEdgeStore } from "~/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

function Cover({ url, preview }: CoverImageProps) {
  const coverImage = useCoverImage();
  const params = useParams();
  const update = useMutation(api.documents.removeImage);
  const { edgestore } = useEdgeStore();

  const handleDeleteImg = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    const id = params.documentId as Id<"documents">;
    update({ id });
  };

  return (
    <div className={`relative w-full h-[10vh] group ${url && "h-[35vh]"} ${url && "bg-muted"}`}>
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2"></ImageIcon>
            Change cover
          </Button>
          <Button
            onClick={handleDeleteImg}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4 mr-2"></X>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]"></Skeleton>;
};

export default Cover;
