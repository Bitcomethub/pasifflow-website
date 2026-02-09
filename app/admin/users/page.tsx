"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    Plus,
    Pencil,
    Trash2,
    Shield,
    Building2,
    UserCheck,
    X,
    Loader2,
    Search,
} from "lucide-react"

interface User {
    id: string
    email: string
    fullName: string | null
    phone: string | null
    role: string
    isVerified: boolean
    createdAt: string
}

const ROLE_LABELS: Record<string, string> = {
    ADMIN: "Admin",
    USER: "Investor",
    AGENT: "Agent",
}

const ROLE_COLORS: Record<string, string> = {
    ADMIN: "bg-red-100 text-red-700 border-red-200",
    USER: "bg-blue-100 text-blue-700 border-blue-200",
    AGENT: "bg-amber-100 text-amber-700 border-amber-200",
}

const ROLE_ICONS: Record<string, typeof Shield> = {
    ADMIN: Shield,
    USER: Building2,
    AGENT: UserCheck,
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [formError, setFormError] = useState("")

    const getToken = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("pasiflow_token") || ""
        }
        return ""
    }

    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/users", {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                const data = await res.json()
                setUsers(data.users)
            }
        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const handleDelete = async (user: User) => {
        if (!confirm(`Delete ${user.fullName || user.email}? This action cannot be undone.`)) return

        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                setUsers(prev => prev.filter(u => u.id !== user.id))
            }
        } catch (error) {
            console.error("Failed to delete user:", error)
        }
    }

    const filteredUsers = users.filter(u => {
        const q = search.toLowerCase()
        return (
            (u.fullName?.toLowerCase().includes(q) ?? false) ||
            u.email.toLowerCase().includes(q) ||
            u.role.toLowerCase().includes(q)
        )
    })

    const stats = {
        total: users.length,
        investors: users.filter(u => u.role === "USER").length,
        agents: users.filter(u => u.role === "AGENT").length,
        admins: users.filter(u => u.role === "ADMIN").length,
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground mt-1">Create and manage investor, agent, and admin accounts.</p>
                </div>
                <Button
                    onClick={() => { setShowCreateModal(true); setEditingUser(null); setFormError("") }}
                    className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create User
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Investors</CardTitle>
                        <Building2 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.investors}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Agents</CardTitle>
                        <UserCheck className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.agents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admins</CardTitle>
                        <Shield className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.admins}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, email, or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Users Table */}
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <Users className="w-10 h-10 mb-3 opacity-50" />
                            <p className="font-medium">No users found</p>
                            <p className="text-sm">Create a new user to get started.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Created</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredUsers.map((user) => {
                                        const RoleIcon = ROLE_ICONS[user.role] || Users
                                        return (
                                            <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-[#C1A05E]/10 flex items-center justify-center text-[#C1A05E] font-bold text-sm">
                                                            {user.fullName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{user.fullName || "—"}</p>
                                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[user.role] || "bg-gray-100 text-gray-700"}`}>
                                                        <RoleIcon className="w-3 h-3" />
                                                        {ROLE_LABELS[user.role] || user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-muted-foreground">{user.phone || "—"}</td>
                                                <td className="py-4 px-6 text-sm text-muted-foreground">
                                                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => { setEditingUser(user); setShowCreateModal(true); setFormError("") }}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(user)}
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <UserFormModal
                    user={editingUser}
                    onClose={() => { setShowCreateModal(false); setEditingUser(null) }}
                    onSuccess={() => {
                        setShowCreateModal(false)
                        setEditingUser(null)
                        fetchUsers()
                    }}
                    error={formError}
                    setError={setFormError}
                    getToken={getToken}
                />
            )}
        </div>
    )
}

function UserFormModal({
    user,
    onClose,
    onSuccess,
    error,
    setError,
    getToken,
}: {
    user: User | null
    onClose: () => void
    onSuccess: () => void
    error: string
    setError: (e: string) => void
    getToken: () => string
}) {
    const isEditing = !!user
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "USER",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError("")

        try {
            const url = isEditing ? `/api/admin/users/${user.id}` : "/api/admin/users"
            const method = isEditing ? "PATCH" : "POST"

            const body: Record<string, string> = {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                role: form.role,
            }
            if (form.password) body.password = form.password

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(body),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Something went wrong")
                return
            }

            onSuccess()
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-lg font-bold">{isEditing ? "Edit User" : "Create New User"}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                            value={form.fullName}
                            onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="user@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>{isEditing ? "New Password (leave blank to keep current)" : "Password"}</Label>
                        <Input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                            placeholder={isEditing ? "••••••••" : "Minimum 8 characters"}
                            required={!isEditing}
                            minLength={8}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["USER", "AGENT", "ADMIN"] as const).map((role) => {
                                const Icon = ROLE_ICONS[role]
                                return (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setForm(f => ({ ...f, role }))}
                                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                                            form.role === role
                                                ? "border-[#C1A05E] bg-[#C1A05E]/10 text-[#C1A05E]"
                                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {ROLE_LABELS[role]}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-[#C1A05E] hover:bg-[#a38d5d] text-white"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isEditing ? (
                                "Save Changes"
                            ) : (
                                "Create User"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
