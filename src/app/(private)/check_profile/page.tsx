'use client'

import { useRouter, redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { fetchPersonByUserId } from "@/lib/api"
import { authClient } from "@/lib/auth.client"

let interval: NodeJS.Timeout

export default function CheckProfile() {
	const router = useRouter()

	const [progress, setProgress] = useState(0)

	useEffect(() => {
		async function getSession() {
			const session = await authClient.getSession()

			if(session.data?.user.id) {
				const person = await fetchPersonByUserId(session.data.user.id)

				if(person  && !(person.birthdate && person?.gender)) {
					router.push(`/profile?completion=1`)
				} else {
					redirect('/home')
				}
			}
		}

		getSession()
	}, [])

	useEffect(() => {
		interval = setInterval(() => {
			setProgress(old => old < 100 ? old + 1 : 0)
		}, 60)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="flex flex-col justify-center items-center gap-6 h-full">
			<span className="text-md text-slate-300">Carregando...</span>
			<Progress value={progress} className="h-1 max-w-2xs w-full" />
		</div>
	)
}