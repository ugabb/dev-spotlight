import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

// Import Header component 
import Header from "@editorjs/header";
import Alert from 'editorjs-alert';

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
            placeholder: "Write your project description",
            tools: {
              header: Header,
              alert: Alert
            },
            data: {
              "time": 1710882330257,
              "blocks": [
                {
                  "id": "9WgBQpF2X4",
                  "type": "header",
                  "data": {
                    "text": "Teste de Descrição",
                    "level": 2
                  }
                },
                {
                  "id": "Xr2tcl_9Qx",
                  "type": "paragraph",
                  "data": {
                    "text": "Este projeto consiste na mudança do editor nesse caralho"
                  }
                }
              ],
              "version": "2.29.0"
            },
            // onChange: async () => {
            //   const data = await editor.save();
            //   console.log(data);
            // }
          });
          setEditorInstance(editor);
          editorRef.current = true;

        }).catch(error => {
          console.error("Error loading EditorJS:", error);
        });

      }
    } else {
      editorRef.current = null;
    }

  }, []);

  return <div id="editorjs-container" className="prose prose-invert w-full bg-black rounded-md px-3 py-2 border border-mainGray/20  hover:border-mainPurple focus:outline-none focus:border-mainPurple"></div>;
};

export default ReactEditor;
