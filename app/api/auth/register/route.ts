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

const saveUsers = (users: User[]) => {
  ensureDataDirectory()
  const filePath = getUsersFilePath()
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const users = getUsers()

    // Check if user already exists
    if (users.find((u) => u.username === username)) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 })
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
    }

    users.push(newUser)
    saveUsers(users)

    return NextResponse.json({
      user: { id: newUser.id, username: newUser.username },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
