import { redirect } from 'next/navigation';

export default async function ProjectRedirect({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    redirect(`/?window=finder&folder=projects&project=${slug}`);
}
