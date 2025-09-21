"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react"

export function ChatSupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [showContactOptions, setShowContactOptions] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      setShowContactOptions(true)
    }
  }

  const handleWhatsAppChat = () => {
    const whatsappMessage = encodeURIComponent(`Hi Susan, I need help with: ${message}`)
    window.open(`https://wa.me/+19543129264?text=${whatsappMessage}`, "_blank")
    setMessage("")
    setShowContactOptions(false)
    setIsOpen(false)
  }

  const handleEmailChat = () => {
    const emailSubject = encodeURIComponent("Support Request")
    const emailBody = encodeURIComponent(`Hi Susan,\n\nI need help with: ${message}\n\nBest regards`)
    window.open(`mailto:support@cryptoinvest.com?subject=${emailSubject}&body=${emailBody}`, "_blank")
    setMessage("")
    setShowContactOptions(false)
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <Card className="w-80 shadow-2xl border-0 bg-background">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/professional-woman-support-agent.jpg"
                      alt="Susan - Support Agent"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Susan</h3>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Available</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false)
                    setShowContactOptions(false)
                    setMessage("")
                  }}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {!showContactOptions ? (
                <>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">Hi! I'm Susan, your support agent. How can I help you today?</p>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="text-sm"
                    />
                    <Button onClick={handleSendMessage} disabled={!message.trim()} className="w-full" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Your message:</strong> {message}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">Choose how you'd like to continue:</p>
                  </div>

                  <div className="space-y-2">
                    <Button onClick={handleWhatsAppChat} className="w-full bg-green-600 hover:bg-green-700" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Continue on WhatsApp
                    </Button>
                    <Button onClick={handleEmailChat} variant="outline" className="w-full bg-transparent" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Continue via Email
                    </Button>
                  </div>

                  <Button
                    onClick={() => {
                      setShowContactOptions(false)
                      setMessage("")
                    }}
                    variant="ghost"
                    className="w-full text-xs"
                    size="sm"
                  >
                    Back to Chat
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
