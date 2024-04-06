'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BubbleButton from './BubbleButton'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { Bold, Italic, Strikethrough, Underline } from "lucide-react"
import FloatingButton from './FloatingButton'
import { LucideHeading1, LucideHeading2, LucideHeading3 } from 'lucide-react'
import { RxFontBold, RxFontItalic, RxCode, RxStrikethrough, RxHeading } from 'react-icons/rx'
import { PiCodeBlock } from "react-icons/pi";
import parse from 'html-react-parser';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript';
import hljs from 'highlight.js';

interface TiptapEditorProps {
  register: any
}

const lowlight = createLowlight(common)
hljs.registerLanguage("javascript", javascript)

const Tiptap = ({ register }: TiptapEditorProps) => {
  const [text, setText] = useState("<p>teste</p><h1>dadaw<br></h1><h2>fafaef</h2><p></p><p><strong>gww<em>g</em></strong></p>")
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [openFloatingMenu, setOpenFloatingMenu] = useState<boolean>(false)
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'my-custom-class',
        },
        languageClassPrefix: 'language-',
        defaultLanguage: 'javascript',
      }),
    ],
    onFocus({ editor }) {
      setShowMenu(true)
    },
    onBlur({ editor }) {
      setTimeout(() => {
        setShowMenu(false)
      }, 3000)
    },
    onSelectionUpdate() {
      setShowMenu(true)
    },
    onUpdate({ editor }) {
      handleSaveText()
    },
    content: text,
    editorProps: {
      attributes: {
        class: "outline-none min-h-[400px] min-w-full bg-zinc-900 rounded-lg p-3",
      }
    }
  })
  if (!editor) {
    return null
  }


  const handleHeading = (level: any, e) => {
    e.preventDefault()
    const currentLevel = editor.getAttributes("heading").level
    if (level !== currentLevel) {
      editor.chain().focus().setHeading({ level: level }).run()
    }
    if (level === currentLevel) {
      editor.commands.clearNodes()
      // editor.commands.setHeading({ level: level })
    }

    // const content = editor.getJSON().content
    // console.log(content)
    // const newContent = content.map((con) => con.content.filter((conteudo) => {
    //   console.log(conteudo)
    //   return conteudo.text !== "/" && conteudo.type === "text"
    // }))
    // console.log(newContent)
    // editor.commands.setContent(newContent)
  }

  const handleBold = (e: any) => {
    e.preventDefault()
    editor.chain().focus().toggleBold().run()
  }
  const handleItalic = (e: any) => {
    e.preventDefault()
    editor.chain().focus().toggleItalic().run()
  }
  const handleStrike = (e: any) => {
    e.preventDefault()
    editor.chain().focus().toggleStrike().run()
  }
  const handleCodeBlock = (e: any) => {
    e.preventDefault()
    editor.chain().focus().setCodeBlock().run()
  }

  const handleSaveText = () => {
    const html = editor.getHTML()
    setText(html)
  }


  return (
    <div className='w-full' {...register("editor")} onChange={handleSaveText}>
      {showMenu &&
        <ToggleGroup className='fixed bottom-10 inset-x-0 z-50 ' type="multiple">
          <div className="bg-zinc-950 p-1 rounded-md shadow-md shadow-mainPurple/20 transition-opacity opacity-100">
            <ToggleGroupItem value='h1'>
              <BubbleButton data-active={editor.isActive("heading", { level: 1 })} onClick={(e) => handleHeading(1, e)}><LucideHeading1 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value='h2'>
              <BubbleButton data-active={editor.isActive("heading", { level: 2 })} onClick={(e) => handleHeading(2, e)}><LucideHeading2 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value='h3'>
              <BubbleButton data-active={editor.isActive("heading", { level: 3 })} onClick={(e) => handleHeading(3, e)}><LucideHeading3 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value="bold" aria-label="Toggle bold" >
              <BubbleButton data-active={editor.isActive("bold")} onClick={(e) => handleBold(e)}>
                <Bold className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <BubbleButton data-active={editor.isActive("italic")} onClick={(e) => handleItalic(e)}>
                <Italic className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <BubbleButton data-active={editor.isActive("strike")} onClick={(e) => handleStrike(e)}>
                <Strikethrough className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value="code" aria-label="Toggle code">
              <BubbleButton data-active={editor.isActive("codeBlock")} onClick={(e) => handleCodeBlock(e)}>
                <PiCodeBlock className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value="codelowlight" aria-label="Toggle codelowlight">
              <BubbleButton data-active={editor.isActive("codeBlock")} onClick={(e) => handleCodeBlock(e)}>
                <PiCodeBlock className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
          </div>
        </ToggleGroup>
      }
      <EditorContent editor={editor} className='prose prose-invert w-full' />

      {/* MENU HOVER */}
      {editor && (
        <BubbleMenu editor={editor} className='flex items-center bg-zinc-950 shadow-md shadow-mainPurple/20 border-zinc-600 rounded-md overflow-hidden divide-x-1 divide-zinc-500 '>
          <ToggleGroup type='multiple'>
            <ToggleGroupItem value='h1'>
              <BubbleButton data-active={editor.isActive("heading", { level: 1 })} onClick={(e) => handleHeading(1, e)}><LucideHeading1 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value='h2'>
              <BubbleButton data-active={editor.isActive("heading", { level: 2 })} onClick={(e) => handleHeading(2, e)}><LucideHeading2 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value='h3'>
              <BubbleButton data-active={editor.isActive("heading", { level: 3 })} onClick={(e) => handleHeading(3, e)}><LucideHeading3 size={16} /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='bold'>
              <BubbleButton data-active={editor.isActive("bold")} onClick={(e) => handleBold(e)}><Bold className="h-4 w-4" /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='italic'>
              <BubbleButton data-active={editor.isActive("italic")} onClick={(e) => handleItalic(e)}><Italic className="h-4 w-4" /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='strike'>
              <BubbleButton data-active={editor.isActive("strike")} onClick={(e) => handleStrike(e)}><Strikethrough className="h-4 w-4" /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='code'>
              <BubbleButton data-active={editor.isActive("code")} onClick={(e) => editor.chain().focus().toggleCodeBlock().run()}><RxCode /></BubbleButton>
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
      {/* {editor && (
        <FloatingMenu className='flex flex-col py-2 px-1 items-center gap-1 bg-zinc-700 shadow-lg shadow-mainPurple/20 border-zinc-600 rounded-lg overflow-hidden'
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;
            setOpenFloatingMenu(currentLineText === "/")
            return currentLineText === "/"
          }}>
          <FloatingButton handleToggle={() => { }} title='Text' subtitle='Write with defualt text' icon={PiTextTThin} />

          <FloatingButton handleToggle={() => handleHeading(1)} title='Heading 1' subtitle='Big section heading' icon={RxHeading} />
          <FloatingButton handleToggle={() => handleHeading(2)} title='Heading 2' subtitle='Medium section heading' icon={RxHeading} />
          <FloatingButton handleToggle={() => handleHeading(3)} title='Heading 3' subtitle='Small section heading' icon={RxHeading} />
        </FloatingMenu>
      )} */}

      <div className='prose prose-invert'>
        {parse(text)}
      </div>

    </div>
  )
}

export default Tiptap