import { ReactNode } from "react"
import TournamentHeader from "@/components/TournamentHeader"

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col gap-16 pb-16">
			<TournamentHeader />

			{children}
		</div>
	)
}
