import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { CustomTextColor } from "../../../../extension/custom-text-color";
import { COLORS } from "./lib/color";
import { useMemo } from "react";

export default function TiptapColorPickerDemo() {
  const savedContent = useMemo(() => {
    const savedContent = localStorage.getItem("editorContent");
    console.log("saved content: ", savedContent);
    return savedContent ? JSON.parse(savedContent) : "";
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, CustomTextColor],
    content: savedContent
      ? savedContent
      : `<p>Example: <span style="color: red;">red</span> or <span style="color: blue">blue</span></p>`,

    autofocus: true,
  });
  //   const editor = new Editor({
  //   extensions: [StarterKit, TextStyle, CustomTextColor],
  //   content: savedContent
  //     ? savedContent
  //     : `<p>Example: <span style="color: red;">red</span> or <span style="color: blue">blue</span></p>`,

  //   autofocus: true,
  // });

  if (!editor) return null;

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const color = e.target.value;
    if (color === "unset") {
      editor.chain().focus().unsetTextColor().run();
      return;
    }

    if (color.startsWith("text-")) {
      editor.chain().focus().setTextColor({ class: color }).run();
    } else {
      editor
        .chain()
        .focus()
        .setTextColor({ style: `color: ${color}` })
        .run();
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-3 flex items-center gap-2">
        <label htmlFor="colorPicker" className="text-sm font-medium">
          Text color:
        </label>
        <select
          id="colorPicker"
          onChange={handleColorChange}
          className="rounded border px-3 py-1 text-sm shadow-sm"
        >
          <option value="unset">Default</option>
          {COLORS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded border p-4 shadow-sm">
        <EditorContent editor={editor} />
      </div>

      <div className="mt-3 text-xs text-neutral-500">
        Try selecting a color from the dropdown above.
      </div>
      <button
        className="p-4 m-4 border border-black hover:bg-amber-400 cursor-pointer"
        onClick={() => {
          localStorage.setItem(
            "editorContent",
            JSON.stringify(editor.getJSON())
          );
        }}
      >
        Save content to storage
      </button>

      <button
        className="p-4 m-4 border border-black hover:bg-amber-400 cursor-pointer"
        onClick={() => {
          localStorage.removeItem("editorContent");
        }}
      >
        Clear content in storage
      </button>
    </div>
  );
}
