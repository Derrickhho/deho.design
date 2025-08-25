"use client"

import type React from "react"

import { useState } from "react"
import { Folder, User, Mail, FileText, FolderOpen } from "lucide-react"

interface FileSystemItem {
  id: string
  name: string
  type: "folder" | "file"
  icon: React.ReactNode
  content?: React.ReactNode
  children?: FileSystemItem[]
}

const fileSystem: FileSystemItem[] = [
  {
    id: "info",
    name: "Info",
    type: "folder",
    icon: <Folder className="w-4 h-4" />,
    children: [
      {
        id: "about-me",
        name: "About me",
        type: "file",
        icon: <User className="w-4 h-4" />,
        content: (
          <div className="space-y-6 text-[#202020] text-sm leading-relaxed">
            <p>
              deho is short for Derrick Ho - it was the first employee username I ever received. Some things that are
              sacred to me (in no particular order): Wordle, Chinatown, Kelly's cove, your attention, Secret Santa, and Tom Petty.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Currently, I am:</p>
                <div className="flex justify-between">
                  <span>N/A</span>
                  <span className="text-[#828282]">Taking a break</span>
                </div>
              </div>

              <div>
                <p className="font-medium mb-3">Previously, I have:</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Designed at Watershed</span>
                    <span className="text-[#828282]">2023 - 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Designed at Common Room</span>
                    <span className="text-[#828282]">2021 - 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Designed at Robinhood</span>
                    <span className="text-[#828282]">2020 - 2021</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Designed at Dropbox</span>
                    <span className="text-[#828282]">2018 - 2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serviced ice cream at Coldstone</span>
                    <span className="text-[#828282]">2010-2013</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "contact-me",
        name: "Contact me",
        type: "file",
        icon: <Mail className="w-4 h-4" />,
        content: (
          <div className="space-y-4 text-[#202020] text-sm">
            <p>Get in touch with me through any of these channels:</p>
            <div className="space-y-2">
              <p>Email: derrick@deho.design</p>
              <p>LinkedIn: /in/derrickho</p>
              <p>Twitter: @dehodesign</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "work",
    name: "Work",
    type: "folder",
    icon: <Folder className="w-4 h-4" />,
    children: [
      {
        id: "projects",
        name: "Projects",
        type: "file",
        icon: <FileText className="w-4 h-4" />,
        content: (
          <div className="space-y-4 text-[#202020] text-sm">
            <p>Selected work and projects coming soon...</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "fun",
    name: "Fun",
    type: "folder",
    icon: <Folder className="w-4 h-4" />,
    children: [
      {
        id: "hobbies",
        name: "Hobbies",
        type: "file",
        icon: <FileText className="w-4 h-4" />,
        content: (
          <div className="space-y-4 text-[#202020] text-sm">
            <p>Things I enjoy outside of work...</p>
          </div>
        ),
      },
    ],
  },
]

export default function FileSystemPortfolio() {
  const [selectedFolder, setSelectedFolder] = useState<string>("info")
  const [selectedFile, setSelectedFile] = useState<string>("about-me")

  const currentFolder = fileSystem.find((item) => item.id === selectedFolder)
  const currentFile = currentFolder?.children?.find((item) => item.id === selectedFile)

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId)
    const folder = fileSystem.find((item) => item.id === folderId)
    if (folder?.children && folder.children.length > 0) {
      setSelectedFile(folder.children[0].id)
    }
  }

  const handleFileClick = (fileId: string) => {
    setSelectedFile(fileId)
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-[#828282] text-2xl font-normal">deho.design</h1>
        </header>

        {/* File System Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Folders */}
          <div className="col-span-2">
            <nav className="space-y-1">
              {fileSystem.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFolderClick(item.id)}
                  className={`w-full flex items-center gap-2 p-2 text-left rounded transition-colors ${
                    selectedFolder === item.id ? "bg-[#d1d1d1] text-[#202020]" : "text-[#828282] hover:bg-[#ededed]"
                  }`}
                >
                  {selectedFolder === item.id ? <FolderOpen className="w-4 h-4" /> : item.icon}
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Center Panel - Folder Contents */}
          <div className="col-span-3">
            <div className="space-y-1">
              {currentFolder?.children?.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFileClick(item.id)}
                  className={`w-full flex items-center gap-2 p-3 text-left rounded transition-colors ${
                    selectedFile === item.id ? "bg-[#656565] text-white" : "text-[#828282] hover:bg-[#ededed]"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - File Content */}
          <div className="col-span-7">
            <div className="bg-white p-8 rounded-lg min-h-[400px]">
              {currentFile ? (
                <>
                  <h2 className="text-[#202020] text-xl font-medium mb-6">
                    {currentFile.name === "About me" ? "It's me!" : currentFile.name}
                  </h2>
                  {currentFile.content}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#828282]">
                  <p>Select something to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
