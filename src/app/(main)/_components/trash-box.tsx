"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import Spinner from "~/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "~/components/ui/input";
import { ConfirmModal } from "~/components/modals/confirm-modal";
import { useEdgeStore } from "~/lib/edgestore";

function TrashBox() {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const { edgestore } = useEdgeStore();

  const [search, setSearch] = useState("");

  const filteredDocs = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note Restored!",
      error: "Failed to restore note.",
    });
  };

  const onRemove = async (documentId: Id<"documents">, urlImage?: string) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    if (urlImage) {
      await edgestore.publicFiles.delete({
        url: urlImage,
      });
    }

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg"></Spinner>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4"></Search>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        ></Input>
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No document found.
        </p>
        {filteredDocs?.map((doc) => {
          return (
            <div
              key={doc._id}
              role="button"
              onClick={() => onClick(doc._id)}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            >
              <span className="truncate pl-2">{doc.title}</span>
              <div className="flex items-center">
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  role="button"
                  onClick={(e) => onRestore(e, doc._id)}
                >
                  <Undo className="h-4 w-4 text-muted-foreground"></Undo>
                </div>
                <ConfirmModal onConfirm={() => onRemove(doc._id, doc.coverImage)}>
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground"></Trash>
                  </div>
                </ConfirmModal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrashBox;