'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BubbleButton from './BubbleButton'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import BulletList from '@tiptap/extension-bullet-list'
import Link from '@tiptap/extension-link'
// import Placeholder from '@tiptap/extension-placeholder'

import { useCallback, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { Bold, Italic, Strikethrough, Underline } from "lucide-react"
import FloatingButton from './FloatingButton'
import { LucideHeading1, LucideHeading2, LucideHeading3 } from 'lucide-react'
import { RxFontBold, RxFontItalic, RxCode, RxStrikethrough, RxHeading } from 'react-icons/rx'
import { PiCodeBlock, PiLink, PiListBullets } from "react-icons/pi";
import parse from 'html-react-parser';
import { createLowlight, common } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript';
import hljs from 'highlight.js';
import { empty } from '@prisma/client/runtime/library'

interface TiptapEditorProps {
  register: any;
  setValue: any;
}

const lowlight = createLowlight(common)
hljs.registerLanguage("javascript", javascript)

const Tiptap = ({ register, setValue }: TiptapEditorProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  // const [openFloatingMenu, setOpenFloatingMenu] = useState<boolean>(false)
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
      BulletList,
      Link.configure({
        openOnClick: true,
        
      }),
      // Placeholder.configure({
      //   placeholder: 'Write something about your project📝...',
      //   emptyEditorClass: 'is-editor-empty',
      // })
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
    content: "",
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
  const handleBulletList = (e: any) => {
    e.preventDefault()
    editor.chain().focus().toggleBulletList().run()
  }
  const handleCodeBlock = (e: any) => {
    e.preventDefault()
    editor.chain().focus().toggleCodeBlock().run()
  }
  const setLink = (e: any) => {
    e.preventDefault()
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const handleSaveText = () => {
    const html = editor.getHTML()

    setValue("description", html)
  }


  return (
    <div className='w-full' {...register("description")} onChange={handleSaveText}>
      <ToggleGroup className='flex py-5 lg:hidden' type="multiple">
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
            <ToggleGroupItem value="bulletList" aria-label="Toggle underline">
              <BubbleButton data-active={editor.isActive("bulletList")} onClick={(e) => handleBulletList(e)}><PiListBullets className="h-4 w-4" /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value="codelowlight" aria-label="Toggle codelowlight">
              <BubbleButton data-active={editor.isActive("codeBlock")} onClick={(e) => handleCodeBlock(e)}>
                <PiCodeBlock className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
            <ToggleGroupItem value="link" aria-label="Toggle link">
              <BubbleButton data-active={editor.isActive("link")} onClick={(e) => setLink(e)}>
                <PiLink className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
          </div>
        </ToggleGroup>
      {showMenu &&
        <ToggleGroup className='hidden lg:flex fixed bottom-10 inset-x-0 z-50 ' type="multiple">
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
            <ToggleGroupItem value="bulletList" aria-label="Toggle underline">
              <BubbleButton data-active={editor.isActive("bulletList")} onClick={(e) => handleBulletList(e)}><PiListBullets className="h-4 w-4" /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value="codelowlight" aria-label="Toggle codelowlight">
              <BubbleButton data-active={editor.isActive("codeBlock")} onClick={(e) => handleCodeBlock(e)}>
                <PiCodeBlock className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value="link" aria-label="Toggle link">
              <BubbleButton data-active={editor.isActive("link")} onClick={(e) => setLink(e)}>
                <PiLink className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>
          </div>
        </ToggleGroup>
      }
      <EditorContent editor={editor} className='prose prose-invert w-full is-editor-empty' />

      {/* MENU HOVER */}
      {editor && (
        <BubbleMenu editor={editor} className='hidden lg:flex flex-col items-center justify-center bg-zinc-950 shadow-md shadow-mainPurple/20 border-zinc-600 rounded-md  divide-x-1 divide-zinc-500 lg:w-[460px]'>
          <ToggleGroup type='multiple' className='w-full flex items-center justify-center flex-wrap'>
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
            <ToggleGroupItem value='bulletList'>
              <BubbleButton data-active={editor.isActive("bulletList")} onClick={(e) => handleBulletList(e)}><PiListBullets className="h-4 w-4" /></BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value="codelowlight" aria-label="Toggle codelowlight">
              <BubbleButton data-active={editor.isActive("codeBlock")} onClick={(e) => handleCodeBlock(e)}>
                <PiCodeBlock className="h-4 w-4" />
              </BubbleButton>
            </ToggleGroupItem>

            <ToggleGroupItem value="link" aria-label="Toggle link">
              <BubbleButton data-active={editor.isActive("link")} onClick={(e) => setLink(e)}>
                <PiLink className="h-4 w-4" />
              </BubbleButton>
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

    </div>
  )
}

export default Tiptap