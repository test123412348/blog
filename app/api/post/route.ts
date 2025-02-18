import { prisma } from "@/lib/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  if (!title) {
    throw new Error("Missing post parameter");
  }

  const post = await getPost(title);

  return Response.json(post);
}

export type GetPostResponseType = Awaited<ReturnType<typeof getPost>>;

async function getPost(title: string) {
  const post = await prisma.$extends(withAccelerate()).post.findUnique({
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
    where: {
      title,
    },
  });

  return post;
}
