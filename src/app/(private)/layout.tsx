import { ReactNode } from "react"
import { headers } from 'next/headers'
import { redirect } from "next/navigation"
import MainMenu from "@/components/MainMenu"
import NavbarAuth from "@/components/NavbarAuth"
import { auth } from "@/lib/auth"
import { Sheet } from "@/components/ui/sheet"
import { GlobalContextProvider } from "@/contexts/GlobalContext"

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if(!session) {
		redirect('/')
	}

	return (
		<div className="flex flex-col xl:grid xl:grid-cols-[18rem_auto] xl:grid-rows-[auto_1fr] min-h-screen">
			<GlobalContextProvider>
				<Sheet>
					<NavbarAuth />

					<MainMenu />
				</Sheet>
				
				<main className="flex flex-col px-4 md:pl-10 md:pr-8 pt-8 pb-8">
					{children}
				</main>
			</GlobalContextProvider>
		</div>
	)
}
