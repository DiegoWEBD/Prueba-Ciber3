"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
}

interface NoteCardProps {
  note: Note
  onDelete: (id: string) => void
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  return (
    <Card className="bg-slate-700 border-slate-600 hover:bg-slate-650 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-white text-lg font-medium">{note.title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(note.id)}
          className="text-red-400 hover:text-red-300 hover:bg-slate-600 h-8 w-8"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-slate-300 text-sm line-clamp-3">{note.content}</p>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Creada el {formatDate(note.createdAt)}</span>
          <span>ID: {note.id.slice(-10)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
