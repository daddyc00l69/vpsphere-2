import { ServiceHeader } from "@/components/services/ServiceHeader";
import { ServiceTabs } from "@/components/services/ServiceTabs";

export default function ServiceLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    return (
        <div className="flex flex-col min-h-full font-display bg-vpsBackground dark:bg-background-dark">
            <ServiceHeader id={params.id} />
            <ServiceTabs id={params.id} />
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
