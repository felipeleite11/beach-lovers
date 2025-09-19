'use client'

import { fetchPersonByUserId } from "@/lib/api";
import { authClient } from "@/lib/auth.client";
import { Person } from "@/types/Person";
import { User } from "better-auth";
import { redirect, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface GlobalContextProps {
	user: User | null
	person: Person | null
}

export const GlobalContext = createContext({} as GlobalContextProps)

interface GlobalContextProviderProps {
	children: ReactNode
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	const [person, setPerson] = useState<Person | null>(null)

	const router = useRouter()

	useEffect(() => {
		async function getSession() {
			const session = await authClient.getSession()

			if (session.data?.user.id) {
				setUser(session.data.user)

				const person = await fetchPersonByUserId(session.data.user.id)

				if (person && !(person.birthdate && person?.gender)) {
					setPerson(person)

					router.push(`/profile?completion=1`)
				} else {
					redirect('/home')
				}
			}
		}

		getSession()
	}, [])

	useEffect(() => {
		async function getPerson() {
			if (user?.id) {
				const person = await fetchPersonByUserId(user.id)

				setPerson(person)

				const isProfileIncomplete = person && !(person.birthdate && person.gender && person.start_playing_date)

				if (isProfileIncomplete) {
					router.push(`/profile?completion=1`)
				} else {
					redirect('/home')
				}
			}
		}

		getPerson()
	}, [user])

	return (
		<GlobalContext.Provider value={{
			user,
			person
		}}>
			{children}
		</GlobalContext.Provider>
	)
}