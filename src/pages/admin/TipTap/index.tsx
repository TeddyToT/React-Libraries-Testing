// src/Tiptap.tsx
import { useMemo } from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      <div className="mt-10 flex gap-10">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "active" : ""}
        >
          Bold
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "active" : ""}
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editor?.isActive("heading", { level: 1 }) ? "active" : ""}
        >
          H1
        </button>
      </div>
    </>
  );
};

export default Tiptap;
