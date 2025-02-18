import React from "react";
import { Post } from "./_components/Post";

const PostPage = async ({ params }: { params: { title: string } }) => {
  const { title } = await Promise.resolve(params);

  return <Post title={title} />;
};

export default PostPage;
