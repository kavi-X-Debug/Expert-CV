import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold">Product</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/templates">Templates</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/features">Features</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Company</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Resources</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/help">Help Center</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Connect</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Expert CV. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
