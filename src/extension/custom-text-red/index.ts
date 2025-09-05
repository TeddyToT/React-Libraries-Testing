import { Extension } from "@tiptap/core";
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textColorRed: {
      toggleTextColorRed: () => ReturnType
      setTextColorRed: () => ReturnType
      unsetTextColorRed: () => ReturnType
    }
  }
}
export const CustomTextRed = Extension.create({
  name: "textColorRed",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          textColorRed: {
            default: null,
            parseHTML: (element) => {
              const hasClass = Array.from(element.classList || []).some((c) =>
                ["text-red", "text-red-500", "text-red-600"].includes(c)
              );
              const color = (element.style?.color || "").toLowerCase();
              const isRed =
                color === "red" ||
                color === "#ff0000" ||
                color === "rgb(255, 0, 0)";
              return hasClass || isRed ? true : null;
            },
            renderHTML: (attributes) => {
              if (!attributes.textColorRed) return {};
              return { class: "text-red", style: "color:red;" };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleTextColorRed:
        () =>
        ({ commands }) => commands.toggleMark("textStyle", { textColorRed: true }),

      setTextColorRed:
        () =>
        ({ commands }) => commands.setMark("textStyle", { textColorRed: true }),
      unsetTextColorRed:
        () =>
        ({ commands }) => commands.setMark("textStyle", { textColorRed: null })
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-r": () => this.editor.commands.toggleTextColorRed(),
    };
  },
});
