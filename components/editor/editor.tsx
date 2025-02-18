"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { authSchema, AuthSchemaType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props {
  content: string;
  onChange: (content: string) => void;
  onClick: () => void;
  loading: boolean;
  setAuth: (auth: string) => void;
}

const Editor = ({ content, onChange, onClick, loading, setAuth }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(values: AuthSchemaType) {
    setAuth(values.pin);
    setOpen((prev) => !prev);
    onClick();
    form.reset();
  }

  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 rounded-b-md text-gray-200 w-full gap-3 font-medium text-[16px] p-4 outline-none min-h-80",
      },
    },
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4 max-w-[600px]">
        <h1 className="text-3xl text-start font-bold pt-4">Add post content</h1>
        <Toolbar editor={editor} content={content} />
        <EditorContent className="whitespace-pre-line" editor={editor} />
        <div className="w-full flex items-start pt-5">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Authenticate</DialogTitle>
              <DialogDescription>Authenticate to post.</DialogDescription>
              <div className="flex items-center justify-center pt-3">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter your password</FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              pattern={REGEXP_ONLY_DIGITS}
                              {...field}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Enter your 6-digit password.
                          </FormDescription>
                          <FormMessage />
                          <DialogFooter className="mt-4">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button type="submit">Post</Button>
                          </DialogFooter>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Editor;
