"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Facebook, Instagram, Twitter, Coffee, DollarSign, Smile, Clock, Leaf, Plus, Minus, ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ScrollingTextComponent from "./scrolling-text"

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

export function CraveSubscriptionComponent() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("features")
  const [employeeCount, setEmployeeCount] = useState<number>(1)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const toggleCategorySelection = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const categories: Category[] = [
    { id: 1, name: "Snacks", description: "Delicious and nutritious snacks", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Beverages", description: "Refreshing drinks", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Fruits", description: "Fresh and dried fruits", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Healthy Options", description: "Nutritious and diet-friendly choices", image: "/placeholder.svg?height=100&width=100" },
  ]

  const pricingTiers: PricingTier[] = [
    { name: "Basic", pricePerEmployee: 5, description: "Essential snacks and drinks" },
    { name: "Standard", pricePerEmployee: 10, description: "A balanced mix of treats" },
    { name: "Premium", pricePerEmployee: 15, description: "Our most comprehensive snack package" },
  ]

  const valuePropositions: ValueProposition[] = [
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Save up to 25% by opting for our curated snack boxes without compromising on quality."
    },
    {
      icon: Smile,
      title: "Employee Satisfaction",
      description: "Boost morale with a consistent supply of snacks and beverages tailored to your team's preferences."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We prioritize eco-friendly packaging and partner with sustainable snack brands."
    },
    {
      icon: Clock,
      title: "Convenience",
      description: "Eliminate the hassle of managing office snacks, freeing up time for more important tasks."
    }
  ]

  const calculateTotal = () => {
    if (!selectedTier) return 0
    return selectedTier.pricePerEmployee * employeeCount
  }

  useEffect(() => {
    // This would typically be an API call to fetch the items based on selected categories
    const fetchedItems: Item[] = [
      { category: "Beverage", subcategory: "Coffee", listPrice: 15.32, unit: "1,000 Grams", amount: 1, brands: ["Starbucks", "Lavazza", "Illy", "Peet's"] },
      { category: "Beverage", subcategory: "Tea", listPrice: 2.60, unit: "30 - 50 Sachets", amount: 1, brands: ["Twinings", "Yogi", "Harney & Sons", "Tazo"] },
      { category: "Beverage", subcategory: "Energy Drinks", listPrice: 2.00, unit: "250 ml", amount: 1, brands: ["Red Bull", "Monster", "Rockstar", "Celsius"] },
      { category: "Snacks", subcategory: "Chips", listPrice: 1.69, unit: "150 Grams", amount: 1, brands: ["Lay's", "Pringles", "Doritos", "Kettle"] },
      { category: "Snacks", subcategory: "Chocolate Bars", listPrice: 1.20, unit: "50 Grams", amount: 1, brands: ["Snickers", "Twix", "KitKat", "Hershey's"] },
      { category: "Fruits", subcategory: "Fresh Apples", listPrice: 0.50, unit: "per piece", amount: 1, brands: ["Gala", "Fuji", "Granny Smith"] },
      { category: "Fruits", subcategory: "Dried Mango", listPrice: 3.32, unit: "100 Grams", amount: 1, brands: ["Trader Joe's", "Kirkland", "Sun-Maid"] },
      { category: "Healthy Options", subcategory: "Protein Bars", listPrice: 2.74, unit: "60 Grams", amount: 1, brands: ["Quest", "RXBAR", "KIND", "Clif"] },
      { category: "Healthy Options", subcategory: "Mixed Nuts", listPrice: 5.99, unit: "250 Grams", amount: 1, brands: ["Planters", "Blue Diamond", "Kirkland"] },
      { category: "Healthy Options", subcategory: "Greek Yogurt", listPrice: 1.50, unit: "150 Grams", amount: 1, brands: ["Chobani", "Fage", "Oikos"] },
    ]
    setItems(fetchedItems)
    setOpenCategories(Array.from(new Set(fetchedItems.map(item => item.category))))
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

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, Item[]>)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center space-x-2" href="/">
            <Coffee className="h-6 w-6" />
            <span className="font-bold">Crave</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="transition-colors hover:text-foreground/80 text-foreground/60">
              Get Started
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="transition-colors hover:text-foreground/80 text-foreground/60">
              How it Works
            </button>
            <button onClick={() => scrollToSection('why-us')} className="transition-colors hover:text-foreground/80 text-foreground/60">
              Why Us
            </button>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#">
              Login
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
          <TabsContent value="features" id="features" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-full max-w-3xl mx-auto px-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Delicious Snacks, Delivered Monthly
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Satisfy your team's cravings with our curated box of snacks and beverages delivered right to your office.
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => scrollToSection('how-it-works')} size="lg" variant="outline">
                  Get Informed
                </Button>
                <Button onClick={() => setActiveTab("pricing")} size="lg">
                  Get Started
                </Button>
              </div>
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
                <p className="text-lg font-semibold">Selected  Categories: {selectedCategories.length}</p>
                <Button onClick={() => setActiveTab("items")} size="lg" disabled={selectedCategories.length === 0}>
                  Next: Select Items
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="items" className="h-[calc(100%-2.5rem)] overflow-auto">
            <div className="space-y-8 p-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Select Your Items</h2>
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <Collapsible key={category} open={openCategories.includes(category)} onOpenChange={() => toggleCategory(category)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span>{category}</span>
                      {openCategories.includes(category) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Subcategory</TableHead>
                          <TableHead className="w-[250px]">Brand</TableHead>
                          <TableHead className="w-[150px]">Amount</TableHead>
                          <TableHead className="w-[120px]">Price per Unit</TableHead>
                          <TableHead className="w-[120px]">Unit</TableHead>
                          <TableHead className="w-[120px]">Total Cost</TableHead>
                          <TableHead className="w-[100px]">Select</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.subcategory}</TableCell>
                            <TableCell>{item.brands.join(", ")}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => changeItemAmount(items.indexOf(item), -1)} disabled={item.amount === 0}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{item.amount}</span>
                                <Button variant="outline" size="sm" onClick={() => changeItemAmount(items.indexOf(item), 1)}>
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
                                onCheckedChange={() => toggleItemSelection(items.indexOf(item))}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CollapsibleContent>
                </Collapsible>
              ))}
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
        <section>
          <ScrollingTextComponent />
        </section>
        {/* "How It Works" section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">How It Works</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold">Mystery Box, Big Savings</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  At Crave, we ship a box filled with high-quality products where you won't know the specific brands in advance. This unique approach allows us to offer you significant discounts on premium snacks and beverages.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  By removing brand bias and focusing on quality, we can provide you with an exciting variety of products at unbeatable prices. It's like a surprise party for your taste buds, with the added bonus of substantial savings!
                </p>
                <Button size="lg" onClick={() => setActiveTab("pricing")}>Get Started</Button>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src=""
                  alt="How Crave Works"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Why Choose Crave?</h2>
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
              <h3 className="text-lg font-semibold mb-2">Crave</h3>
              <p className="text-sm">Satisfying your team's cravings, one box at a time.</p>
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
            <p>© 2024 Crave. All rights reserved.</p>
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

export default CraveSubscriptionComponent