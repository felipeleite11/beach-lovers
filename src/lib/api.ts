import { TournamentData, PersonData } from "@/types/shared"
import axios from "axios"

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL
})

// Person
export async function fetchPeople(): Promise<PersonData[]> {
	const response = await api.get<PersonData[]>('/api/person')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar pessoas')
	}

	return response.data
}

export async function fetchPerson(slug: string): Promise<PersonData> {
	const response = await api.get<PersonData>(`/api/person/${slug}`)
	
	if (response.status !== 200) {
		throw new Error('Erro ao buscar pessoa')
	}

	return response.data
}

// Tournament
export async function fetchTournaments(): Promise<TournamentData[]> {
	const response = await api.get<TournamentData[]>('/api/tournament')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar torneios')
	}

	return response.data
}