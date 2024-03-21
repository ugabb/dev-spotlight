// Import Header component
import Header from "@editorjs/header";
import Alert from "editorjs-alert";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import Checklist from "@editorjs/checklist";
import SimpleImage from "simple-image-editorjs";
import LinkTool from "@editorjs/link";
import AnyButton from "editorjs-button";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
import Marker from "@editorjs/marker";
import CodeTool from "@editorjs/code";
import CodeBox from "@bomdi/codebox";


export const EDITOR_TOOLS = {
  header: Header,
  alert: Alert,
  quote: Quote,
  list: List,
  nestedList: NestedList,
  checkList: Checklist,
  image: SimpleImage,
  // linkTool: LinkTool,
  // AnyButton: {
  //   class: AnyButton,
  //   inlineToolbar: false,
  //   config: {
  //     css: {
  //       "background-color": "btn--link--color",
  //       "btnColor": "btn--red",
  //     }
  //   }
  // },
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C",
  },
  code: CodeTool,
  codeBox: {
    class: CodeBox,
    config: {
      themeURL:
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
    },
  },
  // Color: {
  //   class: ColorPlugin,
  //   config: {
  //     colorCollections: [
  //       "#EC7878",
  //       "#9C27B0",
  //       "#673AB7",
  //       "#3F51B5",
  //       "#0070FF",
  //       "#03A9F4",
  //       "#00BCD4",
  //       "#4CAF50",
  //       "#8BC34A",
  //       "#CDDC39",
  //       "#FFF",
  //     ],
  //     defaultColor: "#B95AFF",
  //     type: "text",
  //     customPicker: true, // add a button to allow selecting any colour
  //   },
  // },
  // Marker: {
  //   class: Marker,
  //   config: {
  //     color: "#B95AFF",
  //   },
  //   shortcut: "CMD+SHIFT+M",
  // },
};
