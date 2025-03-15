import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data based on the product model
const mockProducts = [
    {
        _id: "1",
        name: "Organic Fertilizer",
        price: 29.99,
        description: "Premium organic fertilizer for all types of plants. Enriched with natural nutrients.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.5,
        category: "Fertilizers",
        isFeatured: true,
        createdBy: "user1",
        createdAt: "2023-07-15T10:30:00Z",
    },
    {
        _id: "2",
        name: "Garden Shovel",
        price: 19.99,
        description: "Durable garden shovel with ergonomic handle for comfortable use.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.2,
        category: "Tools",
        isFeatured: false,
        createdBy: "user1",
        createdAt: "2023-07-10T14:20:00Z",
    },
    {
        _id: "3",
        name: "Tomato Seeds",
        price: 4.99,
        description: "High-yield tomato seeds, perfect for home gardens.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        category: "Seeds",
        isFeatured: true,
        createdBy: "user2",
        createdAt: "2023-07-05T09:15:00Z",
    },
    {
        _id: "4",
        name: "Organic Pest Control",
        price: 14.99,
        description: "Natural pest control solution that's safe for plants and beneficial insects.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.0,
        category: "Pesticides",
        isFeatured: false,
        createdBy: "user2",
        createdAt: "2023-06-28T16:45:00Z",
    },
    {
        _id: "5",
        name: "Irrigation System",
        price: 89.99,
        description: "Automated irrigation system for efficient watering of garden plants.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        category: "Equipment",
        isFeatured: true,
        createdBy: "user1",
        createdAt: "2023-06-20T11:10:00Z",
    },
    {
        _id: "6",
        name: "Pruning Shears",
        price: 12.99,
        description: "Sharp pruning shears for precise cutting of plant stems and branches.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.3,
        category: "Tools",
        isFeatured: false,
        createdBy: "user3",
        createdAt: "2023-06-15T13:25:00Z",
    },
    {
        _id: "7",
        name: "Herb Seeds Collection",
        price: 9.99,
        description: "Collection of essential herb seeds including basil, parsley, and mint.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        category: "Seeds",
        isFeatured: true,
        createdBy: "user3",
        createdAt: "2023-06-10T10:05:00Z",
    },
    {
        _id: "8",
        name: "Soil pH Tester",
        price: 24.99,
        description: "Digital soil pH tester for accurate soil analysis.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.4,
        category: "Equipment",
        isFeatured: false,
        createdBy: "user2",
        createdAt: "2023-06-05T15:30:00Z",
    },
    {
        _id: "9",
        name: "NPK Fertilizer",
        price: 19.99,
        description: "Balanced NPK fertilizer for healthy plant growth.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.1,
        category: "Fertilizers",
        isFeatured: false,
        createdBy: "user1",
        createdAt: "2023-05-28T09:40:00Z",
    },
    {
        _id: "10",
        name: "Fungicide Spray",
        price: 16.99,
        description: "Effective fungicide spray for controlling plant diseases.",
        image: "/placeholder.svg?height=200&width=200",
        rating: 3.9,
        category: "Pesticides",
        isFeatured: false,
        createdBy: "user3",
        createdAt: "2023-05-20T14:15:00Z",
    },
]

export default function Products() {
    // State for products data
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage] = useState(5)

    // State for search
    const [searchTerm, setSearchTerm] = useState("")

    // State for modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        description: "",
        image: "",
        rating: 0,
        category: "Fertilizers",
        isFeatured: false,
    })

    // Load products on component mount
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProducts(mockProducts)
            setFilteredProducts(mockProducts)
            setTotalPages(Math.ceil(mockProducts.length / itemsPerPage))
            setLoading(false)
        }, 1000)
    }, [itemsPerPage])

    // Handle search
    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            setFilteredProducts(filtered)
            setTotalPages(Math.ceil(filtered.length / itemsPerPage))
            setCurrentPage(1)
        } else {
            setFilteredProducts(products)
            setTotalPages(Math.ceil(products.length / itemsPerPage))
        }
    }, [searchTerm, products, itemsPerPage])

    // Get current products for pagination
    const getCurrentProducts = () => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        return filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "rating" ? Number.parseFloat(value) : value,
        }))
    }

    // Handle select changes
    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle checkbox changes
    const handleCheckboxChange = (checked) => {
        setFormData((prev) => ({
            ...prev,
            isFeatured: checked,
        }))
    }

    // Handle add product
    const handleAddProduct = () => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            const newProduct = {
                _id: (products.length + 1).toString(),
                ...formData,
                createdBy: "currentUser",
                createdAt: new Date().toISOString(),
            }
            setProducts([...products, newProduct])
            setIsAddModalOpen(false)
            resetForm()
            setLoading(false)
        }, 1000)
    }

    // Handle edit product
    const handleEditProduct = () => {
        if (!selectedProduct) return

        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            const updatedProducts = products.map((product) =>
                product._id === selectedProduct._id ? { ...product, ...formData } : product,
            )
            setProducts(updatedProducts)
            setIsEditModalOpen(false)
            resetForm()
            setLoading(false)
        }, 1000)
    }

    // Handle delete product
    const handleDeleteProduct = () => {
        if (!selectedProduct) return

        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            const updatedProducts = products.filter((product) => product._id !== selectedProduct._id)
            setProducts(updatedProducts)
            setIsDeleteModalOpen(false)
            setSelectedProduct(null)
            setLoading(false)
        }, 1000)
    }

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: "",
            price: 0,
            description: "",
            image: "",
            rating: 0,
            category: "Fertilizers",
            isFeatured: false,
        })
        setSelectedProduct(null)
    }

    // Open edit modal with product data
    const openEditModal = (product) => {
        setSelectedProduct(product)
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            rating: product.rating,
            category: product.category,
            isFeatured: product.isFeatured,
        })
        setIsEditModalOpen(true)
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your product inventory</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                            <span className="ml-2">Loading products...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : getCurrentProducts().length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                getCurrentProducts().map((product) => (
                                    <TableRow
                                        key={product._id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => {
                                            setSelectedProduct(product)
                                            setIsViewModalOpen(true)
                                        }}
                                    >
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{formatPrice(product.price)}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                                                <span>{product.rating.toFixed(1)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {product.isFeatured ? (
                                                <Badge variant="default" className="bg-primary">
                                                    Featured
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">No</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        openEditModal(product)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedProduct(product)
                                                        setIsDeleteModalOpen(true)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {getCurrentProducts().length} of {filteredProducts.length} products
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

            {/* Add Product Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter product description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fertilizers">Fertilizers</SelectItem>
                                        <SelectItem value="Tools">Tools</SelectItem>
                                        <SelectItem value="Seeds">Seeds</SelectItem>
                                        <SelectItem value="Pesticides">Pesticides</SelectItem>
                                        <SelectItem value="Equipment">Equipment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    placeholder="0.0"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                name="image"
                                placeholder="Enter image URL"
                                value={formData.image || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isFeatured" checked={formData.isFeatured} onCheckedChange={handleCheckboxChange} />
                            <Label htmlFor="isFeatured">Featured Product</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddProduct} disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Product
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Product Modal */}
            {selectedProduct && (
                <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Product Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                    <img
                                        src={selectedProduct.image || "/placeholder.svg?height=200&width=200"}
                                        alt={selectedProduct.name}
                                        className="w-full h-auto rounded-md border object-cover aspect-square"
                                    />
                                </div>
                                <div className="md:w-2/3 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline">{selectedProduct.category}</Badge>
                                            {selectedProduct.isFeatured && (
                                                <Badge variant="default" className="bg-primary">
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-primary text-primary" />
                                        <span className="font-medium">{selectedProduct.rating.toFixed(1)}</span>
                                    </div>
                                    <div className="text-2xl font-bold text-primary">{formatPrice(selectedProduct.price)}</div>
                                    <div>
                                        <h4 className="font-medium mb-1">Description</h4>
                                        <p className="text-muted-foreground">{selectedProduct.description}</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Added on {formatDate(selectedProduct.createdAt)}</div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsViewModalOpen(false)
                                    openEditModal(selectedProduct)
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Edit Product Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Update the product details.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Product Name</Label>
                                <Input
                                    id="edit-name"
                                    name="name"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-price">Price</Label>
                                <Input
                                    id="edit-price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                name="description"
                                placeholder="Enter product description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fertilizers">Fertilizers</SelectItem>
                                        <SelectItem value="Tools">Tools</SelectItem>
                                        <SelectItem value="Seeds">Seeds</SelectItem>
                                        <SelectItem value="Pesticides">Pesticides</SelectItem>
                                        <SelectItem value="Equipment">Equipment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-rating">Rating</Label>
                                <Input
                                    id="edit-rating"
                                    name="rating"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    placeholder="0.0"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                                id="edit-image"
                                name="image"
                                placeholder="Enter image URL"
                                value={formData.image || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="edit-isFeatured" checked={formData.isFeatured} onCheckedChange={handleCheckboxChange} />
                            <Label htmlFor="edit-isFeatured">Featured Product</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditProduct} disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                        {selectedProduct && (
                            <div className="flex items-center space-x-4">
                                <img
                                    src={selectedProduct.image || "/placeholder.svg?height=50&width=50"}
                                    alt={selectedProduct.name}
                                    className="w-12 h-12 rounded-md border object-cover"
                                />
                                <div>
                                    <p className="font-medium">{selectedProduct.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatPrice(selectedProduct.price)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteProduct} disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

