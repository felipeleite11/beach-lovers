import axios from "axios"
import { Tournament } from "@/types/Tournament"
import { TournamentCreateFormInputs } from "@/app/(private)/tournament/create/new/page"
import { Person } from "@/types/Person"
import { Teacher } from "@/types/Teacher"

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL
})

// Person
export async function fetchPeople(): Promise<Person[]> {
	const response = await api.get<Person[]>('/api/person')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar pessoas')
	}

	return response.data
}

export async function fetchPerson(slug: string): Promise<Person> {
	const response = await api.get<Person>(`/api/person/${slug}`)
	
	if (response.status !== 200) {
		throw new Error('Erro ao buscar pessoa')
	}

	return response.data
}

type PersonToUpdate = Omit<Partial<Person>, 'image'> & {
	image?: File
}

export async function updatePerson(person: PersonToUpdate): Promise<Person> {
	const { slug, ...props } = person

	const formData = new FormData()

	Object.entries(props).forEach(([key, value]) => {
		if(key !== 'image') {
			formData.append(key, value)
		} else if(value instanceof File) {
			formData.append(key, value, value.name)
		}
	})

	const response = await api.put<Person>(`/api/person/${slug}`, formData)
	
	if (response.status !== 200) {
		throw new Error('Erro ao atualizar pessoa')
	}

	return response.data
}

export async function fetchPersonByUserId(userId: string): Promise<Person> {
	const response = await api.get<Person>(`/api/person/by_user/${userId}`)
	
	if (response.status !== 200) {
		throw new Error('Erro ao buscar pessoa')
	}

	return response.data
}

// Tournament
export async function fetchTournaments(): Promise<Tournament[]> {
	const response = await api.get<Tournament[]>('/api/tournament')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar torneios')
	}

	return response.data
}

export async function fetchTournamentById(id: string): Promise<Tournament> {
	const response = await api.get<Tournament>(`/api/tournament/${id}`)

	if (response.status !== 200) {
		throw new Error('Erro ao buscar torneios')
	}

	return response.data
}

export async function createTournament(data: TournamentCreateFormInputs): Promise<Tournament> {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if(key !== 'image') {
			formData.append(key, value as string)
		} else if(value instanceof File) {
			formData.append(key, value, value.name)
		}
	})

	const response = await api.post<Tournament>('/api/tournament', formData)

	if (response.status !== 200) {
		throw new Error('Erro ao cadastrar torneio')
	}

	return response.data
}

// Arena
export async function fetchArenas(): Promise<Arena[]> {
	const response = await api.get<Arena[]>('/api/arena')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar arenas')
	}

	return response.data
}

export async function fetchArenasByRegion(regionId: string): Promise<Arena[]> {
	const response = await api.get<Arena[]>('/api/arena', {
		params: {
			region: regionId
		}
	})

	if (response.status !== 200) {
		throw new Error('Erro ao buscar arenas')
	}

	return response.data
}

// Region
export async function fetchRegions(): Promise<Region[]> {
	const response = await api.get<Region[]>('/api/region')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar regiões')
	}

	return response.data
}

// Category
export async function fetchCategories(): Promise<Category[]> {
	const response = await api.get<Category[]>('/api/category')

	if (response.status !== 200) {
		throw new Error('Erro ao buscar categorias')
	}

	return response.data
}

// Teacher

export async function fetchTeacherBySlug(slug: string): Promise<Teacher> {
	const response = await api.get<Teacher>(`/api/teacher/${slug}`)
	
	if (response.status !== 200) {
		throw new Error('Erro ao buscar professor')
	}

	return response.data
}