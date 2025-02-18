"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogSchema, BlogSchemaType } from "@/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import qs from "query-string";
import { redirect } from "next/navigation";

const AdminCreateBlogPage = () => {
  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: BlogSchemaType) => {
    const query = qs.stringify({
      title: values.title,
      description:
        values.description.trim() === "" ? undefined : values.description,
    });
    redirect(`/admin/editor?${query}`);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add a blog post</CardTitle>
          <CardDescription>
            Fill in the details below to create a new blog post and share your
            thoughts with the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be you blog post title{" "}
                      <span className="text-destructive">(required)</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description..."
                        className="resize-none h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be you blog post description{" "}
                      <span className="text-destructive">(required)</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Continue</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreateBlogPage;
