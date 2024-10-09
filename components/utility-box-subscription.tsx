"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, Instagram, Twitter, Package, Leaf, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Category = {
  id: number
  name: string
  description: string
  image: string
}

export function UtilityBoxSubscriptionComponent() {
  const [showProductSelection, setShowProductSelection] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [animateFeatures, setAnimateFeatures] = useState(false)
  const [animateProducts, setAnimateProducts] = useState(false)

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

  useEffect(() => {
    if (showProductSelection) {
      setAnimateFeatures(true)
      setTimeout(() => {
        setAnimateProducts(true)
      }, 300)
    }
  }, [showProductSelection])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <Package className="h-6 w-6" />
            <span className="font-bold">UtilityBox</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">
              Features
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#product-selection">
              Categories
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#sustainability">
              Sustainability
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#pricing">
              Pricing
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section id="features" className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 transition-all duration-300 ${animateFeatures ? 'opacity-0 -translate-x-full' : 'opacity-100'}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Essential Utilities, Delivered Monthly
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Simplify your life with our curated box of snacks, cleaning supplies, and beverages delivered right to your door.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => setShowProductSelection(true)} size="lg">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="product-selection" className={`w-full py-12 md:py-24 lg:py-32 transition-all duration-300 ${animateProducts ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Select Your Categories</h2>
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
            <div className="mt-8 flex justify-between items-center">
              <p className="text-lg font-semibold">Selected Categories: {selectedCategories.length}</p>
              <Button onClick={() => setShowCheckout(true)} size="lg" disabled={selectedCategories.length === 0}>
                Next
              </Button>
            </div>
          </div>
        </section>
        {showCheckout && (
          <section id="checkout" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Checkout</h2>
              <div className="max-w-md mx-auto">
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
                  <Button type="submit" className="w-full">
                    Complete Order
                  </Button>
                </form>
              </div>
            </div>
          </section>
        )}
        <section id="sustainability" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Our Sustainability Efforts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Leaf className="w-10 h-10 mb-2" />
                  <CardTitle>Eco-Friendly Packaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>All our boxes and packaging materials are made from recycled materials and are 100% recyclable.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <DollarSign className="w-10 h-10 mb-2" />
                  <CardTitle>Carbon Offset Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We invest in carbon offset projects to neutralize the environmental impact of our deliveries.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-10 h-10 mb-2" />
                  <CardTitle>Community Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We partner with local organizations to support environmental conservation efforts in our communities.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Basic", "Standard", "Premium"].map((tier) => (
                <Card key={tier} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{tier}</CardTitle>
                    <CardDescription>
                      {tier === "Basic"
                        ? "Essential items for everyday use"
                        : tier === "Standard"
                        ? "A balanced mix of products"
                        : "Our most comprehensive package"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-bold">
                      ${tier === "Basic" ? "29" : tier === "Standard" ? "49" : "79"}
                      <span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li>✓ {tier === "Basic" ? "5" : tier === "Standard" ? "10" : "15"} Items per month</li>
                      <li>✓ Free Shipping</li>
                      {tier !== "Basic" && <li>✓ Customization Options</li>}
                      {tier === "Premium" && <li>✓ Priority Support</li>}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full">Choose {tier}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-800 text-white">
        <div className="container px-4 md:px-6">
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