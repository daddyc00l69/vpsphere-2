import { redirect } from "next/navigation";

export default function ServicePage({ params }: { params: { id: string } }) {
    // Default to metrics or first tab
    redirect(`/services/${params.id}/overview`);
}
