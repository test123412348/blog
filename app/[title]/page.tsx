import React from "react";
import { Post } from "./_components/Post";

interface PageProps {
  params: Promise<{
    title: string;
  }>;
}

const PostPage = async (props: PageProps) => {
  const params = await props.params;
  const { title } = params;

  return <Post title={title} />;
};

export default PostPage;
