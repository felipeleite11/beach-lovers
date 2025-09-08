import { ReactNode } from "react"
import MainMenu from "@/components/MainMenu"
import NavbarAuth from "@/components/NavbarAuth"
import { headers } from 'next/headers'
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if(!session) {
		redirect('/')
	}

	return (
		<div className="grid grid-cols-[18rem_auto] grid-rows-[auto_1fr] min-h-screen">
			<NavbarAuth />

			<MainMenu />
			
			<main className="flex flex-col pl-10 pt-8 pr-8 pb-8">
				{children}
			</main>
		</div>
	)
}
