"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, LogOut } from "lucide-react"
import { NoteCard } from "@/components/note-card"
import { CreateNoteDialog } from "@/components/create-note-dialog"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  username: string
  password: string
}

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
}

interface NotesAppProps {
  user: User
  onLogout: () => void
}

export function NotesApp({ user, onLogout }: NotesAppProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadNotes()
  }, [user.id])

  const loadNotes = async () => {
    try {
      const response = await fetch(`/api/notes?userId=${user.id}`)
      if (response.ok) {
        const userNotes = await response.json()
        setNotes(userNotes)
      }
    } catch (error) {
      console.error("Error loading notes:", error)
    }
  }

  const handleCreateNote = async (noteData: { title: string; content: string }) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...noteData,
          userId: user.id,
        }),
      })

      if (response.ok) {
        const newNote = await response.json()
        setNotes([newNote, ...notes])
        setIsCreateDialogOpen(false)
        toast({
          title: "¡Nota creada!",
          description: "Tu nota ha sido guardada exitosamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la nota",
        variant: "destructive",
      })
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setNotes(notes.filter((note) => note.id !== noteId))
        toast({
          title: "Nota eliminada",
          description: "La nota ha sido eliminada exitosamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la nota",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAllNotes = async () => {
    try {
      const response = await fetch(`/api/notes/delete-all?userId=${user.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setNotes([])
        toast({
          title: "Todas las notas eliminadas",
          description: "Se han eliminado todas tus notas.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron eliminar las notas",
        variant: "destructive",
      })
    }
  }

  const getStats = () => {
    const totalNotes = notes.length
    const averagePerDay = totalNotes > 0 ? Math.round(totalNotes / 30) : 0
    const lastNoteDate = notes.length > 0 ? new Date(notes[0].createdAt).toLocaleDateString("es-ES") : "Sin notas"

    return { totalNotes, averagePerDay, lastNoteDate }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Avatar className="bg-white">
            <AvatarFallback className="text-slate-800 font-semibold">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">Mis Notas</h1>
            <p className="text-sm text-slate-300">Bienvenido, {user.username}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onLogout} className="text-slate-300 hover:text-white hover:bg-slate-700">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        {/* New Note Button */}
        <div className="flex justify-center">
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Nota
          </Button>
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Tus Notas ({notes.length})</h2>
            {notes.length > 0 && (
              <Button
                variant="ghost"
                onClick={handleDeleteAllNotes}
                className="text-red-400 hover:text-red-300 hover:bg-slate-700"
              >
                Eliminar todas
              </Button>
            )}
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No tienes notas aún. ¡Crea tu primera nota!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Estadísticas</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white text-slate-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalNotes}</div>
                <div className="text-sm text-slate-600">Total de Notas</div>
              </CardContent>
            </Card>

            <Card className="bg-green-100 text-slate-800">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.averagePerDay}</div>
                <div className="text-sm text-slate-600">Creadas Promedio</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-100 text-slate-800">
              <CardContent className="p-6 text-center">
                <div className="text-lg font-bold text-purple-600 mb-2">{stats.lastNoteDate}</div>
                <div className="text-sm text-slate-600">Última Nota</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-slate-400 border-t border-slate-700 mt-12">
        MiApp Segura - Taller DevSecOps | Datos almacenados en localStorage
      </footer>

      <CreateNoteDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateNote={handleCreateNote}
      />
    </div>
  )
}
