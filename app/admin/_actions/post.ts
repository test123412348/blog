"use server";

import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/schemas/blog";
import { authenticator } from "otplib";

export const createPost = async (
  title: string,
  description: string | null,
  content: string,
  auth: string
) => {
  try {
    let isValidPassword = false;

    if (process.env.OTP_SECRET) {
      isValidPassword = authenticator.verify({
        token: auth,
        secret: process.env.OTP_SECRET,
      });
    } else {
      throw new Error("Error");
    }

    if (!isValidPassword) return { error: "Invalid password" };

    const descriptionNotNull = description ?? "";

    const form = blogSchema.safeParse({
      title,
      description: descriptionNotNull,
    });

    if (!form.success) {
      return { error: form.error?.issues[0].message };
    }

    const safeTitle = form.data.title;
    const safeDescription = form.data.description;

    const isExistingPost = await prisma.post.findUnique({
      where: {
        title: safeTitle,
      },
    });

    if (isExistingPost) {
      throw new Error(`Post title already exists`);
    }

    await prisma.post.create({
      data: {
        title: safeTitle,
        description: safeDescription,
        content,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }

  return;
};
