'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import { RxFontBold, RxFontItalic, RxCode, RxStrikethrough, RxHeading } from 'react-icons/rx'
import StarterKit from '@tiptap/starter-kit'
import BubbleButton from './BubbleButton'
import Image from 'next/image'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: "outline-none min-h-[400px] w-full bg-zinc-900 rounded-lg p-3",
      }
    }
  })

  if (!editor) {
    return null
  }


  return (
    <div className='w-full'>
      <EditorContent editor={editor} className='prose prose-invert w-full' />
      {editor && (
        <BubbleMenu editor={editor} className='flex items-center bg-zinc-700 shadow-xl shadow-black/20 border-zinc-600 rounded-lg overflow-hidden divide-x-1 divide-zinc-500 '>
          <BubbleButton data-active={editor.isActive("h1")} onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}><RxHeading /></BubbleButton>
          <BubbleButton data-active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><RxFontBold /></BubbleButton>
          <BubbleButton data-active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><RxFontItalic /></BubbleButton>
          <BubbleButton data-active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><RxStrikethrough /></BubbleButton>
          <BubbleButton data-active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><RxCode /></BubbleButton>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu className='flex flex-col py-2 px-1 items-center gap-1 bg-zinc-700 shadow-xl shadow-black/20 border-zinc-600 rounded-lg overflow-hidden'
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/"
          }}>
          <button  type={"button"} className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-mainPurple'>
            <Image src="https://www.notion.so/images/blocks/text/en-US.png" width={60} height={60} alt='heading' className='w-12 rounded' />
            <div className='flex flex-col text-left'>
              <span className='text-sm '>Text</span>
              <span className='text-sm text-zinc-400'>Write with defualt text</span>
            </div>
          </button>
          <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()} type={"button"} className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-mainPurple'>
            <Image src="https://www.notion.so/images/blocks/header.57a7576a.png" width={60} height={60} alt='heading' className='w-12 rounded' />
            <div className='flex flex-col text-left'>
              <span className='text-sm '>Heading 1 </span>
              <span className='text-sm text-zinc-400'>Big section heading</span>
            </div>
          </button>
        </FloatingMenu>
      )}
    </div>
  )
}

export default Tiptap