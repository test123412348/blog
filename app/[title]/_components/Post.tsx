"use client";

import { GetPostResponseType } from "@/app/api/post/route";
import { useQuery } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { format } from "date-fns";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

type Post = {
  title: string;
  description: string;
  content: string;
};

function PostSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Separator className="my-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export function Post({ title }: { title: string }) {
  const postQuery = useQuery<GetPostResponseType>({
    queryKey: ["post", title],
    queryFn: () => fetch(`/api/post?title=${title}`).then((res) => res.json()),
  });

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
  });

  useEffect(() => {
    if (editor && postQuery.data?.content) {
      editor.commands.setContent(postQuery.data.content);
    }
  }, [editor, postQuery.data?.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <Link href="/" className="inline-block mb-8">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size={16} />
          Back to posts
        </Button>
      </Link>

      {postQuery.isLoading ? (
        <PostSkeleton />
      ) : (
        postQuery.data &&
        editor && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="font-bold text-5xl tracking-tight text-primary/90">
                {postQuery.data.title}
              </h1>
              <p className="text-muted-foreground/90 text-lg pl-2">
                {postQuery.data.description}
                <span className="text-muted-foreground/75 mx-2">•</span>
                <time className="font-medium text-muted-foreground/90">
                  {format(new Date(postQuery.data.createdAt), "MMMM d, yyyy")}
                </time>
              </p>
            </motion.div>

            <Separator className="my-8" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-gray dark:prose-invert max-w-none pl-2"
            >
              <EditorContent editor={editor} readOnly />
            </motion.div>
          </div>
        )
      )}
    </motion.div>
  );
}
