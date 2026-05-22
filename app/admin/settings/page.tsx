import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h2>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                            Manage your admin panel preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="site-name">Site Name</Label>
                            <Input id="site-name" defaultValue="Pasiflow Admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Support Email</Label>
                            <Input id="email" defaultValue="support@pasiflow.com" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
