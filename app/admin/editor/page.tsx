"use client";

import Editor from "@/components/editor/editor";
import { useMutation } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { createPost } from "../_actions/post";
import { toast } from "sonner";

const EditorPage = () => {
  const searchParams = useSearchParams();
  const [content, setContent] = useState<string>("");
  const [auth, setAuth] = useState<string>("");

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const postMutation = useMutation({
    mutationFn: () => createPost(title ?? "", description, content, auth),
    onSuccess: (data) => {
      if (data?.error) {
        console.log(data.error);

        toast.error(data.error, { id: "createPost" });
      } else {
        toast.success("Created post 🎉", { id: "createPost" });
      }
    },
    onError: () => {
      toast.error("Failed to create post", { id: "createPost" });
    },
  });

  if (title == undefined) {
    redirect("/admin");
  }

  const handleContentChange = (text: string) => {
    setContent(text);
  };

  const OnPost = async () => {
    toast.loading("Creating post...", { id: "createPost" });
    postMutation.mutate();
  };

  return (
    <>
      <Editor
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
        onClick={() => OnPost()}
        loading={postMutation.isPending}
        setAuth={setAuth}
      />
    </>
  );
};

export default EditorPage;
