'use client'

import { useState, useEffect } from 'react'
import { LoginForm } from '@/components/login-form'
import { NotesApp } from '@/components/notes-app'

interface User {
	id: string
	username: string
	password: string
}

export default function Home() {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Check if user is logged in
		const savedUser = localStorage.getItem('currentUser')
		if (savedUser) {
			setCurrentUser(JSON.parse(savedUser))
		}
		setIsLoading(false)
	}, [])

	const handleLogin = (user: User) => {
		setCurrentUser(user)
		localStorage.setItem('currentUser', JSON.stringify(user))
		localStorage.setItem('access_token', 'kajshdkhagksd')
	}

	const handleLogout = () => {
		setCurrentUser(null)
		localStorage.removeItem('currentUser')
	}

	if (isLoading) {
		return (
			<div className='min-h-screen bg-slate-800 flex items-center justify-center'>
				<div className='text-white'>Cargando...</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-slate-800'>
			{currentUser ? (
				<NotesApp user={currentUser} onLogout={handleLogout} />
			) : (
				<LoginForm onLogin={handleLogin} />
			)}
		</div>
	)
}
