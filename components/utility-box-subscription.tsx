"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Facebook, Instagram, Twitter, Package, DollarSign, Smile, Clock, Leaf, Plus, Minus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Category = {
  id: number
  name: string
  description: string
  image: string
}

type PricingTier = {
  name: string
  pricePerEmployee: number
  description: string
}

type ValueProposition = {
  icon: React.ElementType
  title: string
  description: string
}

type Item = {
  category: string
  subcategory: string
  listPrice: number
  unit: string
  amount: number
  brands: string[]
}

export function UtilityBoxSubscriptionComponent() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("features")
  const [employeeCount, setEmployeeCount] = useState<number>(1)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [items, setItems] = useState<Item[]>([])

  const toggleCategorySelection = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const categories: Category[] = [
    { id: 1, name: "Snacks", description: "Delicious and nutritious snacks", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Beverages", description: "Refreshing drinks", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Pantry", description: "Essential pantry items", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Cleaning", description: "Eco-friendly cleaning supplies", image: "/placeholder.svg?height=100&width=100" },
  ]

  const pricingTiers: PricingTier[] = [
    { name: "Basic", pricePerEmployee: 5, description: "Essential items for everyday use" },
    { name: "Standard", pricePerEmployee: 10, description: "A balanced mix of products" },
    { name: "Premium", pricePerEmployee: 15, description: "Our most comprehensive package" },
  ]

  const valuePropositions: ValueProposition[] = [
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Save up to 25% by opting for surplus products without compromising on quality."
    },
    {
      icon: Smile,
      title: "Employee Satisfaction",
      description: "Boost morale with a consistent supply of snacks and essentials tailored to your team's preferences."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Align with global trends towards environmental responsibility by reducing your company's waste footprint."
    },
    {
      icon: Clock,
      title: "Convenience",
      description: "Eliminate the hassle of managing office supplies, freeing up time for more important tasks."
    }
  ]

  const calculateTotal = () => {
    if (!selectedTier) return 0
    return selectedTier.pricePerEmployee * employeeCount
  }

  useEffect(() => {
    // This would typically be an API call to fetch the items based on selected categories
    const fetchedItems: Item[] = [
      { category: "Beverage", subcategory: "Coffee", listPrice: 15.32, unit: "1,000 Grams", amount: 1, brands: ["Nescafé", "Jacobs", "Melitta", "Lavazza"] },
      { category: "Beverage", subcategory: "Tea", listPrice: 2.60, unit: "30 - 50 Sachets", amount: 1, brands: ["YogiTea", "Mesmer", "Teekanne", "Cupper"] },
      { category: "Beverage", subcategory: "Milk", listPrice: 2.00, unit: "1,000 ml", amount: 1, brands: ["Alpro", "Oatly", "Weihenstephan", "Arla"] },
      { category: "Pantry", subcategory: "Instant Oatmeal", listPrice: 1.69, unit: "500 to 750 Grams", amount: 1, brands: ["Oatsome", "Kölln"] },
      { category: "Pantry", subcategory: "Cereals", listPrice: 7.56, unit: "450 to 1150 Grams", amount: 1, brands: ["Vitalis", "Kölln", "Alnatura"] },
      { category: "Cleaning", subcategory: "Tissues", listPrice: 2.02, unit: "60 pieces", amount: 1, brands: ["Tempo", "Kleenex"] },
      { category: "Cleaning", subcategory: "Hand Soap", listPrice: 3.32, unit: "250 to 350 ml", amount: 1, brands: ["Palmolive", "Sagrotan", "Jean Len"] },
      { category: "Cleaning", subcategory: "Disinfectant Wipes", listPrice: 2.74, unit: "25 to 40 pieces", amount: 1, brands: ["Sagrotan", "SOS"] },
      { category: "Snacks", subcategory: "Chocolate Bars", listPrice: 0.99, unit: "25-40 bars", amount: 1, brands: ["Kitkat", "twix", "snickers", "mars", "bueno", "crunch"] },
      { category: "Snacks", subcategory: "Biscuits/Cookies", listPrice: 11.00, unit: "1,000 gm", amount: 1, brands: ["Oreo", "milka", "Nutella Biscuits"] },
      { category: "Snacks", subcategory: "Dried Fruits", listPrice: 18.00, unit: "1,000 gm", amount: 1, brands: ["Seeberger", "Ja", "REWE Bio"] },
      { category: "Snacks", subcategory: "Protein bar", listPrice: 2.00, unit: "40-50 gm per bar", amount: 1, brands: ["Barebells", "raw bite", "Corny"] },
      { category: "Snacks", subcategory: "Salty Crackers / pretzels", listPrice: 1.79, unit: "80 gm", amount: 1, brands: [] },
      { category: "Snacks", subcategory: "Nuts", listPrice: 22.00, unit: "1000 Grams", amount: 1, brands: ["Studentenfutter", "Lindt", "Seeberger"] },
      { category: "Snacks", subcategory: "Granola Bars", listPrice: 0.60, unit: "20-40 gm per bar", amount: 1, brands: ["Santy", "NatureValley", "BeKind", "Corny"] },
      { category: "Snacks", subcategory: "Chips", listPrice: 2.22, unit: "130-165 per pack", amount: 1, brands: ["Lays", "Dorritos", "Linsen Chips", "Kettle", "Pringles"] },
    ]
    setItems(fetchedItems)
  }, [selectedCategories])

  const toggleItemSelection = (index: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems]
      newItems[index] = { ...newItems[index], amount: newItems[index].amount > 0 ? 0 : 1 }
      return newItems
    })
  }

  const changeItemAmount = (index: number, delta: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems]
      newItems[index] = { ...newItems[index], amount: Math.max(0, newItems[index].amount + delta) }
      return newItems
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link className="flex items-center space-x-2" href="/">
            <Package className="h-6 w-6" />
            <span className="font-bold">UtilityBox</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">
              Features
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#pricing">
              Pricing
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#categories">
              Categories
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#why-us">
              Why Us
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-[calc(100vh-3.5rem)]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="checkout">Checkout</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-full max-w-3xl mx-auto px-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Essential Utilities, Delivered Monthly
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Simplify your life with our curated box of snacks, cleaning supplies, and beverages delivered right to your door.
              </p>
              <Button onClick={() => setActiveTab("pricing")} size="lg">
                Get Started
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="pricing" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="space-y-8 p-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Choose Your Plan</h2>
              <div className="max-w-md mx-auto">
                <Label htmlFor="employeeCount">Number of Employees</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  min="1"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingTiers.map((tier) => (
                  <Card key={tier.name} className={`flex flex-col ${selectedTier?.name === tier.name ? 'border-primary' : ''}`}>
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-4xl font-bold">
                        €{tier.pricePerEmployee}
                        <span className="text-sm font-normal">/employee/week</span>
                      </p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button className="w-full" onClick={() => setSelectedTier(tier)}>
                        {selectedTier?.name === tier.name ? 'Selected' : 'Choose Plan'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {selectedTier && (
                <div className="text-center text-2xl font-bold">
                  Total: €{calculateTotal()} per week
                </div>
              )}
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab("categories")} size="lg" disabled={!selectedTier}>
                  Next: Choose Categories
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="categories" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="space-y-8 p-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Select Your Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Card 
                    key={category.id} 
                    className={`${selectedCategories.includes(category.id) ? 'border-primary' : ''} cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => toggleCategorySelection(category.id)}
                  >
                    <CardHeader>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={100}
                        height={100}
                        className="mx-auto"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategorySelection(category.id)}
                      
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Selected Categories: {selectedCategories.length}</p>
                <Button onClick={() => setActiveTab("items")} size="lg" disabled={selectedCategories.length === 0}>
                  Next: Select Items
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="items" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="space-y-8 p-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Select Your Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price per Unit</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Select</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.subcategory}</TableCell>
                      <TableCell>{item.brands.join(", ")}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => changeItemAmount(index, -1)} disabled={item.amount === 0}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.amount}</span>
                          <Button variant="outline" size="sm" onClick={() => changeItemAmount(index, 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>€{item.listPrice.toFixed(2)}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>€{(item.listPrice * item.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.amount > 0}
                          onCheckedChange={() => toggleItemSelection(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab("checkout")} size="lg" disabled={items.every(item => item.amount === 0)}>
                  Next: Checkout
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="checkout" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="flex items-center justify-center h-full">
              <div className="max-w-md w-full px-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Checkout</h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input id="address" placeholder="123 Main St, City, Country" required />
                  </div>
                  <div className="text-lg font-semibold">
                    Total: €{calculateTotal()} per week
                  </div>
                  <Button type="submit" className="w-full">
                    Complete Order
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Why Choose UtilityBox?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valuePropositions.map((prop, index) => (
                <Card key={index}>
                  <CardHeader>
                    <prop.icon className="w-10 h-10 mb-2 text-primary" />
                    <CardTitle>{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">UtilityBox</h3>
              <p className="text-sm">Simplifying your life, one box at a time.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-white hover:text-gray-300">
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
              <form className="flex space-x-2">
                <Input type="email" placeholder="Enter your email" className="max-w-[300px] bg-white text-black" />
                <Button type="submit" variant="secondary">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400">
            <p>© 2024 UtilityBox. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UtilityBoxSubscriptionComponent;