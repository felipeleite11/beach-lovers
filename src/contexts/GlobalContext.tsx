'use client'

import { fetchPersonByUserId } from "@/lib/api";
import { authClient } from "@/lib/auth.client";
import { Person } from "@/types/Person";
import { User } from "better-auth";
import { redirect, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface GlobalContextProps {
	user: User | null
	person: Person | null
	isProfileComplete: boolean
}

export const GlobalContext = createContext({} as GlobalContextProps)

interface GlobalContextProviderProps {
	children: ReactNode
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
	const { data: session } = authClient.useSession()

	const [user, setUser] = useState<User | null>(null)
	const [person, setPerson] = useState<Person | null>(null)
	const [isProfileComplete, setIsProfileComplete] = useState(false)

	const router = useRouter()

	function checkProfileCompleteness(person: Person | null) {
		return !!(person?.birthdate && person?.gender && person?.start_playing_date)
	}

	useEffect(() => {
		if(session) {
			setUser(session.user)
		}
	}, [session])

	useEffect(() => {
		async function getPerson() {
			if (user?.id) {
				try {
					const person = await fetchPersonByUserId(user.id)

					if(!person) {
						throw new Error('Pessoa não encontrada!')
					}

					setPerson(person)

					const isProfileComplete = checkProfileCompleteness(person)

					setIsProfileComplete(isProfileComplete)

					if (!isProfileComplete) {
						router.push(`/profile?completion=1`)
					} else {
						redirect('/home')
					}
				} catch(e: any) {
					toast.error(e.message)
				}
			}
		}

		getPerson()
	}, [user])

	return (
		<GlobalContext.Provider 
			value={{
				user,
				person,
				isProfileComplete
			}} 
			suppressHydrationWarning
		>
			{children}
		</GlobalContext.Provider>
	)
}