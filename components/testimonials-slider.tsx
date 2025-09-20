"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "I've been investing with this platform for 8 months and my returns have exceeded expectations. The automated trading system is incredible!",
    profit: "$12,450",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "Professional service and consistent profits. I started with $1000 and now I'm making $500+ monthly. Highly recommended!",
    profit: "$8,750",
  },
  {
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    text: "The best crypto investment platform I've used. Transparent, reliable, and profitable. Customer support is excellent too.",
    profit: "$15,200",
  },
  {
    name: "David Thompson",
    location: "London, UK",
    rating: 5,
    text: "Started investing 6 months ago and I'm amazed by the consistent returns. The platform is user-friendly and secure.",
    profit: "$9,800",
  },
  {
    name: "Lisa Wang",
    location: "Toronto, Canada",
    rating: 5,
    text: "This platform changed my financial life. I'm now earning passive income that covers my monthly expenses!",
    profit: "$11,300",
  },
  {
    name: "James Miller",
    location: "Sydney, Australia",
    rating: 5,
    text: "Excellent investment opportunities with great returns. The team is professional and the platform is very secure.",
    profit: "$13,600",
  },
  {
    name: "Maria Santos",
    location: "São Paulo, Brazil",
    rating: 5,
    text: "I was skeptical at first, but after 4 months of consistent profits, I'm convinced this is the real deal!",
    profit: "$7,950",
  },
  {
    name: "Robert Kim",
    location: "Seoul, South Korea",
    rating: 5,
    text: "Amazing platform with cutting-edge technology. My portfolio has grown by 180% in just 7 months!",
    profit: "$18,400",
  },
  {
    name: "Anna Petrov",
    location: "Moscow, Russia",
    rating: 5,
    text: "The automated trading system works perfectly. I'm making money while I sleep. Best investment decision ever!",
    profit: "$10,750",
  },
  {
    name: "Carlos Mendez",
    location: "Mexico City, Mexico",
    rating: 5,
    text: "Professional service and excellent returns. I've recommended this platform to all my friends and family.",
    profit: "$14,200",
  },
  {
    name: "Sophie Laurent",
    location: "Paris, France",
    rating: 5,
    text: "Incredible results in just 5 months. The platform is easy to use and the profits are consistent every week.",
    profit: "$9,650",
  },
  {
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    rating: 5,
    text: "This platform has exceeded all my expectations. Professional team, secure platform, and amazing profits!",
    profit: "$16,800",
  },
  {
    name: "Jennifer Brown",
    location: "Los Angeles, USA",
    rating: 5,
    text: "I've tried many investment platforms, but this one is by far the best. Consistent returns and excellent support.",
    profit: "$12,900",
  },
  {
    name: "Hiroshi Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    text: "The AI-powered trading system is revolutionary. My investments have grown by 220% in 8 months!",
    profit: "$22,100",
  },
  {
    name: "Isabella Rossi",
    location: "Rome, Italy",
    rating: 5,
    text: "Fantastic platform with great returns. I'm earning more from my investments than my regular job!",
    profit: "$13,450",
  },
  {
    name: "Thomas Anderson",
    location: "Stockholm, Sweden",
    rating: 5,
    text: "Reliable, profitable, and secure. I've been investing for 9 months and the results speak for themselves.",
    profit: "$17,300",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "This platform has transformed my financial future. Consistent profits and excellent customer service.",
    profit: "$8,400",
  },
  {
    name: "Lucas Silva",
    location: "Rio de Janeiro, Brazil",
    rating: 5,
    text: "Amazing returns and professional service. I started small and now I'm making significant monthly profits.",
    profit: "$11,750",
  },
  {
    name: "Rachel Green",
    location: "Chicago, USA",
    rating: 5,
    text: "The best investment platform I've ever used. Transparent, reliable, and incredibly profitable!",
    profit: "$14,600",
  },
  {
    name: "Viktor Novak",
    location: "Prague, Czech Republic",
    rating: 5,
    text: "Excellent platform with cutting-edge technology. My portfolio has grown exponentially in just 6 months.",
    profit: "$15,900",
  },
  {
    name: "Fatima Al-Zahra",
    location: "Cairo, Egypt",
    rating: 5,
    text: "Professional service and amazing results. I'm now financially independent thanks to this platform!",
    profit: "$10,200",
  },
  {
    name: "Mark Johnson",
    location: "Vancouver, Canada",
    rating: 5,
    text: "Incredible returns and excellent support team. This platform has changed my life completely!",
    profit: "$19,500",
  },
  {
    name: "Yuki Yamamoto",
    location: "Osaka, Japan",
    rating: 5,
    text: "The automated trading system is brilliant. I'm making consistent profits every single week!",
    profit: "$12,800",
  },
  {
    name: "Elena Popov",
    location: "Sofia, Bulgaria",
    rating: 5,
    text: "Amazing platform with great returns. I've doubled my initial investment in just 4 months!",
    profit: "$9,300",
  },
  {
    name: "Ryan O'Connor",
    location: "Dublin, Ireland",
    rating: 5,
    text: "Professional, reliable, and highly profitable. This is the future of cryptocurrency investing!",
    profit: "$16,400",
  },
  {
    name: "Camila Fernandez",
    location: "Buenos Aires, Argentina",
    rating: 5,
    text: "Excellent platform with consistent results. I'm earning more than I ever thought possible!",
    profit: "$13,700",
  },
  {
    name: "Alex Petersen",
    location: "Copenhagen, Denmark",
    rating: 5,
    text: "The best investment decision I've ever made. Consistent profits and excellent customer service.",
    profit: "$18,200",
  },
  {
    name: "Nadia Kozlov",
    location: "Kiev, Ukraine",
    rating: 5,
    text: "Amazing returns and professional team. This platform has exceeded all my expectations!",
    profit: "$11,600",
  },
  {
    name: "Hassan Ali",
    location: "Istanbul, Turkey",
    rating: 5,
    text: "Incredible platform with cutting-edge technology. My investments have grown by 250% in 7 months!",
    profit: "$21,800",
  },
  {
    name: "Grace Williams",
    location: "Melbourne, Australia",
    rating: 5,
    text: "This platform is absolutely amazing. Consistent profits, secure transactions, and excellent support!",
    profit: "$14,900",
  },
]

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Investors Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied investors who are already earning consistent profits with our platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonials[currentIndex].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{testimonials[currentIndex].name}</div>
                      <div className="text-gray-500">{testimonials[currentIndex].location}</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-semibold">
                      Profit: {testimonials[currentIndex].profit}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 z-10"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Auto-play control */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
          </Button>
        </div>
      </div>
    </section>
  )
}
