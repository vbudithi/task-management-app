import Link from 'next/link'
import { ArrowLeft } from "lucide-react"

type BackButtonProps = {
    href: string
}

export default function PageHeader({ href }: BackButtonProps) {
    return (
        <section>
            <div className="container mx-auto md:px-16 flex items-center justify-between mb-6">
                <Link href={href}
                    className="flex text-blue-500 hover:underline mb-3 items-center"
                    prefetch={false}>
                    <ArrowLeft className="mr-2 align-middle" />
                    Back
                </Link>
            </div>
        </section>
    )
}