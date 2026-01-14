"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

const mockUsers = [
  {
    id: "USR001",
    username: "john.silva",
    email: "john@gestetner.com",
    role: "technician",
    team: "Team A",
    status: "active",
  },
  {
    id: "USR002",
    username: "priya.sharma",
    email: "priya@gestetner.com",
    role: "technician",
    team: "Team B",
    status: "active",
  },
  {
    id: "USR003",
    username: "admin.user",
    email: "admin@gestetner.com",
    role: "admin",
    team: "Management",
    status: "active",
  },
  {
    id: "USR004",
    username: "data.entry",
    email: "data@gestetner.com",
    role: "data_entry",
    team: "Team A",
    status: "inactive",
  },
]

export function UserActivationContent() {
  const [users, setUsers] = useState(mockUsers)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "technician",
    team: "Team A",
  })

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    )
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleAddUser = () => {
    if (newUser.username && newUser.email) {
      setUsers([
        ...users,
        {
          id: `USR${users.length + 1}`,
          ...newUser,
          status: "active",
        },
      ])
      setNewUser({ username: "", email: "", role: "technician", team: "Team A" })
      setShowAddForm(false)
      alert("User added successfully")
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Activation</h1>
          <p className="text-muted-foreground">Manage user access and permissions</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account and assign role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Username</label>
                <Input
                  placeholder="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="mt-2 bg-input border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="email@company.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="mt-2 bg-input border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select value={newUser.role} onValueChange={(val) => setNewUser({ ...newUser, role: val })}>
                  <SelectTrigger className="mt-2 bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="team_leader">Team Leader</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="data_entry">Data Entry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Team</label>
                <Select value={newUser.team} onValueChange={(val) => setNewUser({ ...newUser, team: val })}>
                  <SelectTrigger className="mt-2 bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Team A">Team A</SelectItem>
                    <SelectItem value="Team B">Team B</SelectItem>
                    <SelectItem value="Team C">Team C</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddUser} className="flex-1 bg-primary hover:bg-primary/90">
                Add User
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Username</p>
                  <p className="font-bold">{user.username}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="font-bold capitalize">{user.role.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Team</p>
                  <p className="font-bold">{user.team}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Button
                    onClick={() => toggleUserStatus(user.id)}
                    variant="outline"
                    className={`mt-1 ${
                      user.status === "active"
                        ? "bg-green-500/20 text-green-400 border-green-500/50"
                        : "bg-red-500/20 text-red-400 border-red-500/50"
                    }`}
                  >
                    {user.status.toUpperCase()}
                  </Button>
                </div>
                <Button
                  onClick={() => deleteUser(user.id)}
                  variant="outline"
                  className="text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
