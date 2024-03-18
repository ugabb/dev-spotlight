'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BubbleButton from './BubbleButton'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import FloatingButton from './FloatingButton'
import { LucideHeading1, LucideHeading2, LucideHeading3 } from 'lucide-react'
import { RxFontBold, RxFontItalic, RxCode, RxStrikethrough, RxHeading } from 'react-icons/rx'
import { PiTextTThin } from "react-icons/pi";

const Tiptap = () => {
  const [text, setText] = useState("teste")
  const [openFloatingMenu, setOpenFloatingMenu] = useState<boolean>(false)
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
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


  const handleHeading = (level: any) => {
    editor.chain().focus().setHeading({ level: level }).run()
  }


  return (
    <div className='w-full'>
      <EditorContent editor={editor} className='prose prose-invert w-full' />
      {editor && (
        <BubbleMenu editor={editor} className='flex items-center bg-zinc-700 shadow-lg shadow-mainPurple/20 border-zinc-600 rounded-lg overflow-hidden divide-x-1 divide-zinc-500 '>
          <ToggleGroup type='multiple'>
            <ToggleGroupItem value='heading'>
              <BubbleButton data-active={editor.isActive("h1")} onClick={() => handleHeading(1)}><LucideHeading1 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value='heading'>
              <BubbleButton data-active={editor.isActive("h1")} onClick={() => handleHeading(2)}><LucideHeading2 size={16} /></BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value='heading'>
              <BubbleButton data-active={editor.isActive("h1")} onClick={() => handleHeading(3)}><LucideHeading3 size={16} /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='bold'>
              <BubbleButton data-active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><RxFontBold /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='italic'>
              <BubbleButton data-active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><RxFontItalic /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='strike'>
              <BubbleButton data-active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><RxStrikethrough /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value='code'>
              <BubbleButton data-active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><RxCode /></BubbleButton>
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
      {editor && (
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
      )}
    </div>
  )
}

export default Tiptap