import { Tournament } from "@/types/Tournament"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { format } from "date-fns"
import { Button } from "./ui/button"
import { generateGoogleMapsLink } from "@/utils/google-maps"

interface TournamentSummaryForMapInfoContentProps {
	tournament: Tournament
}

export function TournamentSummaryForMapInfoContent({ tournament }: TournamentSummaryForMapInfoContentProps) {
	return (
		<div className="text-slate-800 grid grid-cols-[60px_auto] grid-rows-[10px_auto] gap-4">
			<Avatar className="w-16 h-16 row-span-3">
				<AvatarImage src={tournament.image || undefined} className="object-cover" />
				<AvatarFallback>{tournament.title.toUpperCase()[0]}</AvatarFallback>
			</Avatar>

			<span className="font-bold">{tournament.title}</span>
			<span className="text-xs text-slate-500">Começa {format(new Date(tournament.start_date), 'dd/MM/yyyy')}</span>

			<Button asChild variant="ghost">
				<a href={generateGoogleMapsLink({ latitude: tournament.latitude, longitude: tournament.longitude }, { navigationMode: true })} target="_blank" rel="noreferrer" className="text-xs text-sky-400 justify-self-end">
					Como chegar?
				</a>
			</Button>
		</div>
	)
}