"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import axios from "axios"

interface EditorProps {
  initialContent?: any
  onChange: (content: any) => void
}

type IParams = {
  storeId: string
}

const Editor: React.FC<EditorProps> = ({ onChange, initialContent }) => {
  const [isMounted, setIsMounted] = useState(false)
  const params = useParams() as IParams
  const editorRef = useRef<EditorJS>()
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("@editorjs/image")).default

    if (!editorRef.current) {
      const editor = new EditorJS({
        onChange: async () => {
          const blocks = await editorRef.current?.save()

          onChange(blocks)
        },
        holder: "editor",
        onReady() {
          editorRef.current = editor
        },
        placeholder: "توضیحات محصول خود را بنویسید...",
        inlineToolbar: true,
        data: initialContent,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(imageFile: File) {
                  const file = new Blob([imageFile], { type: imageFile.type })
                  const { data } = await axios.post(
                    `/api/${params.storeId}/upload-image`,
                    { file },
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  )

                  return {
                    success: 1,
                    file: {
                      url: data.url,
                    },
                  }
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [])
  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }
    if (isMounted) {
      init()
    }
    return () => {
      editorRef.current?.destroy()
      editorRef.current = undefined
    }
  }, [isMounted, initializeEditor])
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <>
      <div id="editor" className=" border rounded-lg p-6" />
    </>
  )
}

export default Editor
