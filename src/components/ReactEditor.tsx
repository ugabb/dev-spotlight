import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

// Import Header component statically
import Header from "@editorjs/header";

const ReactEditor = () => {
  const [editorInstance, setEditorInstance] = useState(null);
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorInstance) {
      console.log(editorInstance);
      editorInstance.save().then((outputData) => {
        console.log(outputData.blocks);
      }).catch(error => console.log(error));
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      if (typeof window !== "undefined" && !editorRef.current) {
        // Dynamically import EditorJS with custom loader function
        const loadEditorJS = async () => {
          const { default: EditorJS } = await import('@editorjs/editorjs');
          return EditorJS;
        };


        loadEditorJS().then(EditorJS => {
          // Initialize EditorJS instance
          const editor = new EditorJS({
            holder: "editorjs-container",
            tools: {
              header: Header // Use Header component as a tool
            },
            onChange: async () => {
              const data = await editor.save();
              console.log(data);
            }
          });
          setEditorInstance(editor);
          editorRef.current = true;
          
        }).catch(error => {
          console.error("Error loading EditorJS:", error);
        });

      }
    }
  }, []);

  return <div id="editorjs-container" className="bg-zinc-900 p-5 h-full prose prose-invert bg-zinc-90 "></div>;
};

export default ReactEditor;
