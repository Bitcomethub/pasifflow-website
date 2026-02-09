// Shared user credentials configuration
// All users are admin-provided via environment variables
// No self-registration - site owner creates credentials and provides them

export interface AppUser {
    id: string
    email: string
    passwordHash: string
    fullName: string
    role: "USER" | "AGENT" | "ADMIN"
}

export function getUsers(): AppUser[] {
    const users: AppUser[] = [
        {
            id: "agent-001",
            email: process.env.DEMO_AGENT_EMAIL || "",
            passwordHash: process.env.DEMO_AGENT_PASSWORD_HASH || "",
            fullName: "Pasiflow Agent",
            role: "AGENT",
        },
        {
            id: "investor-001",
            email: process.env.DEMO_INVESTOR_EMAIL || "",
            passwordHash: process.env.DEMO_INVESTOR_PASSWORD_HASH || "",
            fullName: "Demo Investor",
            role: "USER",
        },
        {
            id: "erman-adanir-001",
            email: process.env.DEMO_USER_EMAIL || "",
            passwordHash: process.env.DEMO_USER_PASSWORD_HASH || "",
            fullName: "Erman Adanır",
            role: "USER",
        },
        {
            id: "demo-client-002",
            email: process.env.DEMO_CLIENT_EMAIL || "",
            passwordHash: process.env.DEMO_CLIENT_PASSWORD_HASH || "",
            fullName: "Demo Client",
            role: "USER",
        },
    ]
    return users.filter(u => u.email && u.passwordHash)
}
