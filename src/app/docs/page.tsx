import { TableOfContents } from "@/components/docs/TableOfContents";

export default function DocsPage() {
    return (
        <div className="flex gap-12">
            <div className="flex-1 min-w-0 max-w-3xl">
                <div className="mb-10">
                    <p className="text-primary font-bold text-sm tracking-wide uppercase mb-2">Developers</p>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">VPSphere API Reference</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                        Welcome to the VPSphere API documentation. Our REST API allows you to programmatically manage your fleets, deployments, and resources with ease.
                    </p>
                </div>

                <section id="introduction" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group flex items-center gap-2">
                        Introduction{" "}
                        <a href="#introduction" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-opacity">#</a>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-7">
                        The VPSphere API is built on REST principles. We encourage you to use our API to integrate VPSphere into your CI/CD pipelines, build custom dashboards, or automate your infrastructure management.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 flex gap-4">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">info</span>
                        <div>
                            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1">OpenAPI Specification</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">You can download our full OpenAPI 3.0 specification file to generate client libraries in your preferred language.</p>
                            <button className="text-xs font-bold bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors">
                                Download openapi.json
                            </button>
                        </div>
                    </div>
                </section>

                <section id="base-url" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group flex items-center gap-2">
                        Base URL{" "}
                        <a href="#base-url" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-opacity">#</a>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                        All API requests should be made to the following base URL:
                    </p>
                    <div className="bg-slate-900 rounded-xl p-4 flex items-center justify-between group">
                        <code className="text-green-400 font-mono text-sm">https://api.devtushar.uk/v1</code>
                        <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100" title="Copy">
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                        </button>
                    </div>
                </section>

                <section id="authentication" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group flex items-center gap-2">
                        Authentication{" "}
                        <a href="#authentication" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-opacity">#</a>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-7">
                        Authenticate your requests by including your Personal Access Token in the <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-semibold">Authorization</code> header.
                    </p>
                    <div className="bg-slate-900 rounded-xl overflow-hidden mb-6">
                        <div className="bg-slate-800/50 px-4 py-2 border-b border-white/5 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">Bash</span>
                            <button className="text-slate-500 hover:text-white text-xs font-bold">COPY</button>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                                <span className="text-purple-400">curl</span> https://api.devtushar.uk/v1/user \<br />
                                &nbsp;&nbsp;<span className="text-amber-400">-H</span> <span className="text-green-400">&quot;Authorization: Bearer vps_123456789&quot;</span>
                            </pre>
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-7">
                        You can generate and manage your API tokens in the <a href="/security/api-tokens" className="text-primary hover:underline font-medium">Security Settings</a>.
                    </p>
                </section>

                <section id="rate-limits" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group flex items-center gap-2">
                        Rate Limits{" "}
                        <a href="#rate-limits" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-opacity">#</a>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-7">
                        API usage is limited to <strong>1,000 requests per minute</strong> for Pro plans. You can check your current usage via the headers returned in every response:
                    </p>
                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-3">Header</th>
                                    <th className="px-6 py-3">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                                <tr>
                                    <td className="px-6 py-3 font-mono text-xs">X-RateLimit-Limit</td>
                                    <td className="px-6 py-3">The maximum number of requests you&apos;re permitted to make per minute.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3 font-mono text-xs">X-RateLimit-Remaining</td>
                                    <td className="px-6 py-3">The number of requests remaining in the current time window.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3 font-mono text-xs">X-RateLimit-Reset</td>
                                    <td className="px-6 py-3">The time at which the current rate limit window resets in UTC epoch seconds.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
            <TableOfContents />
        </div>
    );
}
