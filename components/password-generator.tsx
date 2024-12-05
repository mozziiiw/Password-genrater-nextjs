"use client"

import { useState } from "react"
import { Copy, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast, { Toaster } from 'react-hot-toast'

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [previousPassword, setPreviousPassword] = useState("")
  const [length, setLength] = useState(36)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    if (options.uppercase) chars += uppercase
    if (options.lowercase) chars += lowercase
    if (options.numbers) chars += numbers
    if (options.symbols) chars += symbols

    if (chars === "") chars = lowercase // Fallback to lowercase if nothing selected

    setPreviousPassword(password)
    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Password copied to clipboard')
    } catch (err) {
      console.error("Failed to copy text: ", err)
      toast.error('Failed to copy password')
    }
  }

  const downloadPassword = () => {
    const element = document.createElement("a")
    const file = new Blob([password], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "generated_password.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Password downloaded as text file')
  }

  const getPasswordStrength = (): "WEAK" | "MEDIUM" | "STRONG" => {
    let strength = 0
    if (options.uppercase) strength++
    if (options.lowercase) strength++
    if (options.numbers) strength++
    if (options.symbols) strength++
    if (length >= 12) strength++

    if (strength <= 2) return "WEAK"
    if (strength <= 4) return "MEDIUM"
    return "STRONG"
  }

  const strengthColor = {
    WEAK: "bg-red-500",
    MEDIUM: "bg-yellow-500",
    STRONG: "bg-emerald-500",
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-4xl font-bold text-white">Password Generator</CardTitle>
          <p className="text-gray-300">
            The Ultimate Tool for Maximum Password Protection
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="flex items-center border rounded-lg p-3 bg-gray-800 text-white">
              <div className="flex-1 font-mono break-all">{password}</div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-gray-300 hover:text-white"
                  onClick={() => copyToClipboard(password)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-gray-300 hover:text-white"
                  onClick={downloadPassword}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-1 mt-2">
              {["WEAK", "MEDIUM", "STRONG"].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full ${
                    level === getPasswordStrength() ? strengthColor[level] : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <div className="absolute right-0 mt-1">
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  strengthColor[getPasswordStrength()]
                }`}
              >
                {getPasswordStrength()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <label className="text-sm font-medium">Password Length</label>
                <span className="text-sm text-gray-300">{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                max={50}
                min={6}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Security Features</label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, [key]: !!checked }))
                      }
                    />
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            size="lg"
            onClick={generatePassword}
          >
            Generate Password
          </Button>

          {previousPassword && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Previous Password</label>
              <div className="flex items-center border rounded-lg p-3 bg-gray-800 text-white">
                <div className="flex-1 font-mono break-all">{previousPassword}</div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-gray-300 hover:text-white"
                    onClick={() => copyToClipboard(previousPassword)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-gray-300 hover:text-white"
                    onClick={() => {
                      setPassword(previousPassword)
                      downloadPassword()
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
    </div>
  )
}

