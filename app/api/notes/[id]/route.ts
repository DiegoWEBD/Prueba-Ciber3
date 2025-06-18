import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
}

const getNotesFilePath = () => {
  return path.join(process.cwd(), "data", "notes.json")
}

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

const getNotes = (): Note[] => {
  ensureDataDirectory()
  const filePath = getNotesFilePath()

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]))
    return []
  }

  try {
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const saveNotes = (notes: Note[]) => {
  ensureDataDirectory()
  const filePath = getNotesFilePath()
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2))
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const notes = getNotes()
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex === -1) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    notes.splice(noteIndex, 1)
    saveNotes(notes)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
