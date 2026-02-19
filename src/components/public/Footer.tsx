import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">deployed_code</span>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-white">VPSphere</span>
                    </div>
                    <p className="max-w-xs mb-6">Empowering developers to reclaim their hardware with modern cloud workflows.</p>
                    <div className="flex gap-4">
                        <a className="hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                        <a className="hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                    </div>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Product</h5>
                    <ul className="space-y-4 text-sm">
                        <li><Link className="hover:text-white transition-colors" href="/#features">Features</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/pricing">Pricing</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/changelog">Changelog</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/docs">Docs</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Company</h5>
                    <ul className="space-y-4 text-sm">
                        <li><Link className="hover:text-white transition-colors" href="/about">About</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/privacy">Privacy</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/terms">Terms</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Status</h5>
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                        All systems operational
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center text-xs">
                © 2024 VPSphere Inc. All rights reserved.
            </div>
        </footer>
    );
}
