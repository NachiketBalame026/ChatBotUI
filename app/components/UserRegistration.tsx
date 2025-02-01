"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa"

export default function UserRegistration({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 0) {
      setStep(1)
    } else {
      onNext()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold mb-6">Create your account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 0 ? (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <Button type="button" variant="outline" className="w-full">
              <FaGoogle className="mr-2" />
              Continue with Google
            </Button>
          </>
        ) : (
          <div>
            <Label htmlFor="verification">Email Verification Code</Label>
            <Input id="verification" type="text" placeholder="Enter code" required />
            <p className="text-sm text-gray-500 mt-2">We&apos;ve sent a verification code to {email}</p>
            <Button type="submit" className="w-full mt-4">
              Verify and Continue
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  )
}

