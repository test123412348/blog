"use client";

import { useQuery } from "@tanstack/react-query";
import { GetPostsResponseType } from "./api/posts/route";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const postsQuery = useQuery<GetPostsResponseType>({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then((res) => res.json()),
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Latest Posts</h1>
        <p className="text-muted-foreground text-lg mb-12">
          Explore the latest blog posts that I wrote.
        </p>

        <div className="grid gap-6">
          {postsQuery.data?.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${post.title}`}>
                <Card className="group transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:scale-105 group-hover:text-primary transition-all group-hover:translate-x-1 duration-200" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}

          {postsQuery.isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 w-2/3 bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded mt-2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {postsQuery.data?.length == 0 && !postsQuery.isFetching && (
            <Card>
              <CardHeader>
                <CardTitle>No posts yet</CardTitle>
                <CardDescription>
                  Check back later for new content.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}
