'use client'

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Confirmation() {
	const { id } = useParams()

	return (
		<div className="flex flex-col items-center gap-4 mt-8 animate__animated animate_fadeIn animate__fast">
			<CheckCircle size={56} className="text-lime-500" />
			<div className="flex justify-center font-semibold text-center">Tudo certo! Sua inscrição foi realizada com sucesso!</div>

			<Button asChild>
				<Link href={`/tournament/${id}`} className="">
					Ok
				</Link>
			</Button>
		</div>
	)
}