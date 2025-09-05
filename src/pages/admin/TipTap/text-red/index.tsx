import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CustomTextRed } from "../../../../extension/custom-text-red";
import {TextStyle} from "@tiptap/extension-text-style";

export default function TiptapRedDemo() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      CustomTextRed,
    ],
    content: `<p>Example: Text <span style="color: #FF0000;">red</span> or type ~~markdown~~ to red.</p>`,
    autofocus: true,
  });

  if (!editor) return null;

  const isActive = editor.isActive("textStyle", { textColorRed: true });

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleTextColorRed().run()}
          className={`rounded border px-3 py-1 hover:bg-red-500 hover:text-white cursor-pointer transition hover:shadow ${
            isActive ? "bg-red-600 text-white" : "bg-white"
          }`}
          title="Red (Ctrl/Cmd + R)"
        >
          Red text
        </button>
      </div>

      <div className="rounded border p-4 shadow-sm">
        <EditorContent editor={editor} />
      </div>

      <div className="mt-3 text-xs text-neutral-500">
        Shortcut: <kbd>Ctrl/Cmd</kbd> + <kbd>R</kbd>
      </div>
    </div>
  );
}
