import Editor from "@stfy/react-editor.js";
import { createReactEditorJS } from 'react-editor-js'
import Header from "@editorjs/header";
// import Quote from "@editorjs/quote"
const ReactEditorJS = createReactEditorJS()
const ReactEditor = () => {
  return (
    <div className="">
      <Editor
        autofocus
        holder="editorjs-container"
        onChange={() => console.log("Something is changing!!")}
        onData={(data) => console.log({ data })}
        tools={{
          header: Header,
        }}
        onReady={() => console.log("Start!")}
        placeholder={"write your project description"}
      />
    </div>
  );
};

export default ReactEditor;
