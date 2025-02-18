import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  BoldIcon,
  CodeIcon,
  HeadingIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | null;
  content: string;
}

const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="h-full pt-5">
      <div className="w-full border border-gray-700 rounded-t-md flex items-center justify-center space-x-1 px-2">
        <div className="flex flex-row items-center py-1 space-x-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <UndoIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <RedoIcon />
          </Button>
          <Separator className="h-5 w-[2px]" orientation="vertical" />
        </div>
        <div className="flex flex-row items-center py-1 space-x-1">
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              editor.isActive("bold") && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => {
              editor.chain().focus().unsetCode().run();
              editor.chain().focus().toggleBold().run();
            }}
          >
            <BoldIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              editor.isActive("italic") && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => {
              editor.chain().focus().unsetCode().run();
              editor.chain().focus().toggleItalic().run();
            }}
          >
            <ItalicIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              editor.isActive("strike") && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => {
              editor.chain().focus().unsetCode().run();
              editor.chain().focus().toggleStrike().run();
            }}
          >
            <StrikethroughIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              editor.isActive("code") && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <CodeIcon />
          </Button>
          <Separator className="h-5 w-[2px]" orientation="vertical" />
        </div>
        <div className="flex flex-row items-center py-1 space-x-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              editor.isActive("heading") && "bg-gray-500 hover:bg-gray-500"
            )}
          >
            <HeadingIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              editor.isActive("bulletList") && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              editor.isActive("orderedList") && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrderedIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
