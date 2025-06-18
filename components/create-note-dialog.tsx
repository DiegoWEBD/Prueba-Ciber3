"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateNote: (noteData: { title: string; content: string }) => void
}

export function CreateNoteDialog({ open, onOpenChange, onCreateNote }: CreateNoteDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onCreateNote({ title: title.trim(), content: content.trim() })
      setTitle("")
      setContent("")
    }
  }

  const handleClose = () => {
    setTitle("")
    setContent("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-700 border-slate-600 text-white">
        <DialogHeader>
          <DialogTitle>Nueva Nota</DialogTitle>
          <DialogDescription className="text-slate-300">
            Crea una nueva nota mental. Completa el título y el contenido.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de tu nota..."
              className="bg-slate-600 border-slate-500 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de tu nota..."
              className="bg-slate-600 border-slate-500 text-white min-h-[120px]"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleClose} className="text-slate-300 hover:text-white">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Crear Nota
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
