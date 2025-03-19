import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProductForm({ formData, handleInputChange, handleSelectChange, handleCheckboxChange, isEditing = false }) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={`${isEditing ? 'edit-' : ''}name`}>Product Name</Label>
                    <Input
                        id={`${isEditing ? 'edit-' : ''}name`}
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={`${isEditing ? 'edit-' : ''}price`}>Price</Label>
                    <Input
                        id={`${isEditing ? 'edit-' : ''}price`}
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
                <Label htmlFor={`${isEditing ? 'edit-' : ''}description`}>Description</Label>
                <Textarea
                    id={`${isEditing ? 'edit-' : ''}description`}
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={`${isEditing ? 'edit-' : ''}category`}>Category</Label>
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
                    <Label htmlFor={`${isEditing ? 'edit-' : ''}rating`}>Rating</Label>
                    <Input
                        id={`${isEditing ? 'edit-' : ''}rating`}
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
                <Label htmlFor={`${isEditing ? 'edit-' : ''}image`}>Image URL</Label>
                <Input
                    id={`${isEditing ? 'edit-' : ''}image`}
                    name="image"
                    placeholder="Enter image URL"
                    value={formData.image || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`${isEditing ? 'edit-' : ''}isFeatured`}
                    checked={formData.isFeatured}
                    onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor={`${isEditing ? 'edit-' : ''}isFeatured`}>Featured Product</Label>
            </div>
        </div>
    )
}