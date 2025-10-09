'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Pairs() {
	const { id } = useParams<{ id: string }>()

	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-semibold text-2xl">Definição de duplas / equipes</h1>

			<p className="text-sm">Escolha como você prefere formar as duplas / equipes do torneio.</p>

			<div className="flex gap-6">
				<Button asChild variant="secondary">
					<Link href={`/tournament/${id}/draw`}>
						Por sorteio
					</Link>
				</Button>

				<Button asChild variant="secondary">
					<Link href={`/tournament/${id}/manual`}>
						Formação manual
					</Link>
				</Button>
			</div>
		</div>
	)
}