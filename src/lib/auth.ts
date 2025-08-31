import { User } from '@/types'

export function getDemoUsers(): User[] {
  try {
    return JSON.parse(process.env.DEMO_USERS || "[]")
  } catch {
    return []
  }
}

export function authenticate(username: string, password: string): boolean {
  const users = getDemoUsers()
  return users.some(
    (u) => u.username === username && u.password === password
  )
}
