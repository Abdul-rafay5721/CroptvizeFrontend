import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Mock data for users
const mockUsers = [
    {
        id: "USR-001",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        role: "user",
        joinedOn: "2023-01-15T10:30:00Z",
    },
    {
        id: "USR-002",
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 234-5678",
        role: "admin",
        joinedOn: "2023-01-20T14:20:00Z",
    },
    {
        id: "USR-003",
        email: "michael.brown@example.com",
        phone: "+1 (555) 345-6789",
        role: "user",
        joinedOn: "2023-02-05T09:15:00Z",
    },
    {
        id: "USR-004",
        email: "emily.davis@example.com",
        phone: "+1 (555) 456-7890",
        role: "user",
        joinedOn: "2023-02-12T16:45:00Z",
    },
    {
        id: "USR-005",
        email: "david.wilson@example.com",
        phone: "+1 (555) 567-8901",
        role: "user",
        joinedOn: "2023-02-18T11:10:00Z",
    },
    {
        id: "USR-006",
        email: "jennifer.taylor@example.com",
        phone: "+1 (555) 678-9012",
        role: "user",
        joinedOn: "2023-03-01T13:25:00Z",
    },
    {
        id: "USR-007",
        email: "robert.anderson@example.com",
        phone: "+1 (555) 789-0123",
        role: "user",
        joinedOn: "2023-03-10T10:05:00Z",
    },
    {
        id: "USR-008",
        email: "lisa.martinez@example.com",
        phone: "+1 (555) 890-1234",
        role: "admin",
        joinedOn: "2023-03-15T15:30:00Z",
    },
    {
        id: "USR-009",
        email: "daniel.thomas@example.com",
        phone: "+1 (555) 901-2345",
        role: "user",
        joinedOn: "2023-03-22T09:40:00Z",
    },
    {
        id: "USR-010",
        email: "jessica.white@example.com",
        phone: "+1 (555) 012-3456",
        role: "user",
        joinedOn: "2023-04-01T14:15:00Z",
    },
    {
        id: "USR-011",
        email: "christopher.harris@example.com",
        phone: "+1 (555) 123-4567",
        role: "user",
        joinedOn: "2023-04-10T11:20:00Z",
    },
    {
        id: "USR-012",
        email: "amanda.clark@example.com",
        phone: "+1 (555) 234-5678",
        role: "user",
        joinedOn: "2023-04-18T16:10:00Z",
    },
    {
        id: "USR-013",
        email: "matthew.lewis@example.com",
        phone: "+1 (555) 345-6789",
        role: "user",
        joinedOn: "2023-05-05T13:45:00Z",
    },
    {
        id: "USR-014",
        email: "olivia.walker@example.com",
        phone: "+1 (555) 456-7890",
        role: "user",
        joinedOn: "2023-05-12T10:30:00Z",
    },
    {
        id: "USR-015",
        email: "andrew.young@example.com",
        phone: "+1 (555) 567-8901",
        role: "user",
        joinedOn: "2023-05-20T15:20:00Z",
    },
]

export default function Customers() {
    // State for users data
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [roleLoading, setRoleLoading] = useState(null)

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage] = useState(10)

    // Load users on component mount
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setUsers(mockUsers)
            setTotalPages(Math.ceil(mockUsers.length / itemsPerPage))
            setLoading(false)
        }, 1000)
    }, [itemsPerPage])

    // Get current users for pagination
    const getCurrentUsers = () => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        return users.slice(indexOfFirstItem, indexOfLastItem)
    }

    // Handle role change
    const handleRoleChange = (userId, newRole) => {
        setRoleLoading(userId)

        // Simulate API call
        setTimeout(() => {
            const updatedUsers = users.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
            setUsers(updatedUsers)
            setRoleLoading(null)
            toast.success(`User role updated to ${newRole}`)
        }, 1000)
    }

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                <p className="text-muted-foreground">Manage your users and their roles</p>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined On</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                            <span className="ml-2">Loading customers...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : getCurrentUsers().length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                getCurrentUsers().map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            <div className="w-[110px]">
                                                {roleLoading === user.id ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                                        <span className="text-sm">Updating...</span>
                                                    </div>
                                                ) : (
                                                    <Select
                                                        value={user.role}
                                                        onValueChange={(value) => handleRoleChange(user.id, value)}
                                                    >
                                                        <SelectTrigger className="h-8">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="user">
                                                                <div className="flex items-center">
                                                                    <span>User</span>
                                                                    {user.role === "user" && <Check className="ml-2 h-4 w-4" />}
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="admin">
                                                                <div className="flex items-center">
                                                                    <span>Admin</span>
                                                                    {user.role === "admin" && <Check className="ml-2 h-4 w-4" />}
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatDate(user.joinedOn)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {getCurrentUsers().length} of {users.length} customers
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous Page</span>
                        </Button>
                        <div className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next Page</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

