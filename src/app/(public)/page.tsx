import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroPreview } from "@/components/public/HeroPreview";

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden pb-20 pt-32 lg:pt-40 bg-slate-50 dark:bg-slate-950">
                {/* Background Decorations */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.1)_0%,transparent_60%)] pointer-events-none"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vpsPurple/10 text-vpsPurple text-xs font-bold mb-8 border border-vpsPurple/20 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-vpsPurple animate-pulse"></span>{" "}
                        NOW IN PUBLIC BETA
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight max-w-5xl mx-auto animate-fade-in-up delay-100">
                        The modern cloud experience, <br className="hidden lg:block" />
                        <span className="bg-gradient-to-r from-vpsPurple to-vpsIndigo bg-clip-text text-transparent">hosted at home.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        Deploy from GitHub to your personal server in seconds.
                        VPSphere brings Vercel-like developer experience to your hardware.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                        <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-vpsPurple text-white rounded-xl font-bold text-lg shadow-xl shadow-vpsPurple/30 hover:bg-vpsPurple/90 hover:scale-[1.02] transition-all">
                            Get Started for Free
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">play_circle</span>{" "}
                            Watch Demo
                        </button>
                    </div>

                    {/* Dashboard Preview */}
                    <HeroPreview />
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-24 bg-white dark:bg-slate-900" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Everything you need, locally.</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Get enterprise-grade deployment features on your existing hardware.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Item: Automated CI/CD */}
                        <div className="md:col-span-2 p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-vpsPurple/30 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-9xl text-vpsPurple">rocket_launch</span>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-vpsPurple/10 text-vpsPurple flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Automated CI/CD Pipelines</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                    Push code to your repository, and we handle the rest. We verify the commit, build the container, run tests, and deploy to your home server automatically. Zero configuration required for most frameworks.
                                </p>
                                <div className="flex gap-4 mt-8">
                                    <Link href="/dashboard">
                                        <Button size="lg" className="h-12 px-8 text-base bg-vpsPurple hover:bg-vpsPurple/90 text-white shadow-xl shadow-vpsPurple/20 rounded-vps font-bold transition-all hover:scale-105 active:scale-95">
                                            Launch Console{" "}
                                            <span className="material-symbols-outlined ml-2">rocket_launch</span>
                                        </Button>
                                    </Link>
                                    <Link href="/docs">
                                        <Button variant="outline" size="lg" className="h-12 px-8 text-base border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-all">
                                            Documentation
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Tall Item: Secure Tunneling */}
                        <div className="md:row-span-2 p-8 rounded-3xl bg-slate-900 text-white hover:bg-slate-800 transition-colors group relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

                            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">vpn_lock</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Secure Tunneling</h3>
                            <p className="text-slate-300 leading-relaxed mb-8">
                                Connect to your local services securely from anywhere without opening ports. We provide a secure, encrypted tunnel directly to your device.
                            </p>
                            <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-xs text-emerald-400 border border-slate-700">
                                $ curl https://api.devtushar.uk<br />
                                {">"} HTTP/1.1 200 OK<br />
                                {">"} Server: VPSphere-Edge
                            </div>
                        </div>

                        {/* Medium Item: Edge Performance */}
                        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-vpsPurple/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">bolt</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Latency</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Developing locally has never been this fast. Your code runs where you code.
                            </p>
                        </div>

                        {/* Medium Item: Monitoring */}
                        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-vpsPurple/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">monitoring</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Real-time Metrics</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Live CPU, Memory, and Network observability for all your deployments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works (Keep existing but styled) */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                {/* ... (Keep the content logic roughly the same but maybe clean up classes if needed, for now assuming it fits) */}
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-16 text-center">How it Works</h2>
                    <div className="space-y-12 relative">
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                        {/* Steps... */}
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-vpsPurple text-vpsPurple flex items-center justify-center font-bold z-10 shrink-0 shadow-sm">1</div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Connect your GitHub</h3>
                                <p className="text-slate-600 dark:text-slate-400">Link your account and select the repositories you want to deploy.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-vpsPurple text-vpsPurple flex items-center justify-center font-bold z-10 shrink-0 shadow-sm">2</div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Install Agent</h3>
                                <p className="text-slate-600 dark:text-slate-400">Run a single command on your server to install the lightweight VPSphere agent.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 relative">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-vpsPurple text-vpsPurple flex items-center justify-center font-bold z-10 shrink-0 shadow-sm">3</div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Push to Deploy</h3>
                                <p className="text-slate-600 dark:text-slate-400">Every git push triggers an automatic build and update on your server.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-vpsPurple relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight">Ready to reclaim your hardware?</h2>
                    <p className="text-white/80 mb-10 text-lg">Join the revolution of local-first cloud hosting.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register" className="px-10 py-4 bg-white text-vpsPurple rounded-xl font-black text-lg shadow-xl hover:scale-105 transition-transform">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
