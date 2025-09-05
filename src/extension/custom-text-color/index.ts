import { Extension } from "@tiptap/core";
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textColor: {
      setTextColor: (payload: { class?: string; style?: string }) => ReturnType;
      unsetTextColor: () => ReturnType;
    };
  }
}
export const CustomTextColor = Extension.create({
  name: "customTextColor",

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
          textColor: {
            default: { class: null, style: null },
            parseHTML: (element) => {
              const classList = Array.from(element.classList || []);
              const tailwindClass = classList.find((c) =>
                /^text-(red|blue|green|yellow|purple|gray)-\d{3}$/.test(c)
              );
              if (tailwindClass) {
                return { class: tailwindClass, style: null };
              }

              const rawColor = (element.style?.color || "").toLowerCase();
              if (rawColor) {
                return { class: null, style: `color: ${rawColor}` };
              }

              return { class: null, style: null };
            },

            renderHTML: (attributes) => {
              const { class: cls, style } = attributes.textColor;
              const htmlAttrs: Record<string, string> = {};
              if (cls) {
                htmlAttrs.class = cls;
              }
              if (style) {
                htmlAttrs.style = style;
              }
              return htmlAttrs;
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextColor:
        (payload: { class?: string; style?: string }) =>
        ({ commands }) => {
          return commands.setMark("textStyle", {
            textColor: {
              class: payload.class || null,
              style: payload.style || null,
            },
          });
        },

      unsetTextColor:
        () =>
        ({ commands }) => {
          return commands.setMark("textStyle", {
            textColor: { class: null, style: null },
          });
        },
    };
  },
});
