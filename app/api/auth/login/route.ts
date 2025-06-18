import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface User {
  id: string
  username: string
  password: string
}

const getUsersFilePath = () => {
  return path.join(process.cwd(), "data", "users.json")
}

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

const getUsers = (): User[] => {
  ensureDataDirectory()
  const filePath = getUsersFilePath()

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

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const users = getUsers()
    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ user: { id: user.id, username: user.username } })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
