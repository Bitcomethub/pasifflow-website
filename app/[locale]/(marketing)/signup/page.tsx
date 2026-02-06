import { redirect } from "next/navigation"

// Signup is disabled — all credentials are provided by Pasiflow admin
export default function SignupPage() {
    redirect("login")
}
