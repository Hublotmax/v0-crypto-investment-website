import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl">CryptoVest</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Professional crypto investment platform trusted by thousands of investors worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#plans" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2024 CryptoVest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
