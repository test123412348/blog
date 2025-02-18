import { prisma } from "@/lib/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function GET() {
  const posts = await getPosts();

  return new Response(JSON.stringify(posts));
}

export type GetPostsResponseType = Awaited<ReturnType<typeof getPosts>>;

async function getPosts() {
  return await prisma.$extends(withAccelerate()).post.findMany({
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
    select: {
      title: true,
      description: true,
    },
  });
}
