import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Mock data for orders
const mockOrders = [
    {
        id: "ORD-001",
        customerName: "John Smith",
        productName: "Organic Fertilizer",
        price: 49.99,
        orderDate: "2023-07-15T10:30:00Z",
    },
    {
        id: "ORD-002",
        customerName: "Sarah Johnson",
        productName: "Pest Control Kit",
        price: 79.99,
        orderDate: "2023-07-14T14:20:00Z",
    },
    {
        id: "ORD-003",
        customerName: "Michael Brown",
        productName: "Garden Tools Set",
        price: 129.99,
        orderDate: "2023-07-13T09:15:00Z",
    },
    {
        id: "ORD-004",
        customerName: "Emily Davis",
        productName: "Plant Health Monitor",
        price: 59.99,
        orderDate: "2023-07-12T16:45:00Z",
    },
    {
        id: "ORD-005",
        customerName: "David Wilson",
        productName: "Seed Collection",
        price: 34.99,
        orderDate: "2023-07-11T11:10:00Z",
    },
    {
        id: "ORD-006",
        customerName: "Jennifer Taylor",
        productName: "Pruning Shears",
        price: 12.99,
        orderDate: "2023-07-10T13:25:00Z",
    },
    {
        id: "ORD-007",
        customerName: "Robert Anderson",
        productName: "Herb Seeds Collection",
        price: 9.99,
        orderDate: "2023-07-09T10:05:00Z",
    },
    {
        id: "ORD-008",
        customerName: "Lisa Martinez",
        productName: "Soil pH Tester",
        price: 24.99,
        orderDate: "2023-07-08T15:30:00Z",
    },
    {
        id: "ORD-009",
        customerName: "Daniel Thomas",
        productName: "NPK Fertilizer",
        price: 19.99,
        orderDate: "2023-07-07T09:40:00Z",
    },
    {
        id: "ORD-010",
        customerName: "Jessica White",
        productName: "Fungicide Spray",
        price: 16.99,
        orderDate: "2023-07-06T14:15:00Z",
    },
    {
        id: "ORD-011",
        customerName: "Christopher Harris",
        productName: "Garden Gloves",
        price: 8.99,
        orderDate: "2023-07-05T11:20:00Z",
    },
    {
        id: "ORD-012",
        customerName: "Amanda Clark",
        productName: "Watering Can",
        price: 14.99,
        orderDate: "2023-07-04T16:10:00Z",
    },
    {
        id: "ORD-013",
        customerName: "Matthew Lewis",
        productName: "Compost Bin",
        price: 39.99,
        orderDate: "2023-07-03T13:45:00Z",
    },
    {
        id: "ORD-014",
        customerName: "Olivia Walker",
        productName: "Plant Food",
        price: 11.99,
        orderDate: "2023-07-02T10:30:00Z",
    },
    {
        id: "ORD-015",
        customerName: "Andrew Young",
        productName: "Garden Hose",
        price: 29.99,
        orderDate: "2023-07-01T15:20:00Z",
    },
]


export default function Orders() {
    // State for orders data
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage] = useState(10)

    // Load orders on component mount
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setOrders(mockOrders)
            setTotalPages(Math.ceil(mockOrders.length / itemsPerPage))
            setLoading(false)
        }, 1000)
    }, [itemsPerPage])

    // Get current orders for pagination
    const getCurrentOrders = () => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        return orders.slice(indexOfFirstItem, indexOfLastItem)
    }

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
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
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                <p className="text-muted-foreground">View all customer orders</p>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Order Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                            <span className="ml-2">Loading orders...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : getCurrentOrders().length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                getCurrentOrders().map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.customerName}</TableCell>
                                        <TableCell>{order.productName}</TableCell>
                                        <TableCell>{formatPrice(order.price)}</TableCell>
                                        <TableCell>{formatDate(order.orderDate)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {getCurrentOrders().length} of {orders.length} orders
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

