import { useState } from "react"
import { Link } from "react-router-dom"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)

        // TODO: Implement actual signup logic
        setTimeout(() => {
            setIsLoading(false)
            toast("Account created successfully", {
                position: "top-right",
            })
        }, 1000)
    }

    return (
        <div className="bg-gray-50 flex sm:min-h-screen min-h-[90vh] flex-col items-center justify-center sm:px-0 px-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-md bg-card shadow-lg sm:p-6 p-4 rounded-lg">
                <div className="flex flex-col space-y-2 text-center">
                    <Leaf className="mx-auto h-6 w-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="Enter your phone number"
                                type="tel"
                                autoCapitalize="none"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="new-password"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="new-password"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            )}
                            Create Account
                        </Button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

