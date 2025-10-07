import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Inbox, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function MyTournaments() {
	return (
		<div>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Inbox size={24} className="text-slate-500" />
					</EmptyMedia>
				</EmptyHeader>
				<EmptyTitle>
					Você ainda não criou nenhum torneio.
				</EmptyTitle>
				<EmptyDescription>
					Busque um torneio para disputar ou crie seu próprio.
				</EmptyDescription>
				<EmptyContent>
					<Button variant="outline" asChild>
						<Link href="/tournament/search">
							Buscar um torneio
							<Search size={16} />
						</Link>
					</Button>

					<Button>
						Criar meu primeiro torneio
						<Plus size={16} />
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	)
}