import { ReactNode } from "react"
import NavbarPublic from "@/components/NavbarPublic"

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<NavbarPublic />
			
			<main className="flex flex-col">
				{children}
			</main>
		</div>
	)
}
