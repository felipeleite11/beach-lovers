import { ReactNode } from "react"
import { headers } from 'next/headers'
import { redirect } from "next/navigation"
import MainMenu from "@/components/MainMenu"
import NavbarAuth from "@/components/NavbarAuth"
import { auth } from "@/lib/auth"

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
