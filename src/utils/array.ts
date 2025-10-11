import { Person } from "@/types/Person"

export function groupItemsInPairs<T>(array: T[]): T[][] {
	if (!array || array.length % 2 !== 0) {
		throw new Error('Array must have pair length.')
	}

	return array.reduce((result, item, index) => {
		if (index % 2 === 0) {
			result.push([item])
		} else {
			result[result.length - 1].push(item)
		}

		return result
	}, [] as T[][])
}

export function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array].sort(() => Math.random() - 0.5)

	return shuffled
}

export function groupIntoCouples(people: Person[]) {
	const males = people.filter(p => p.gender === 'M')
	const females = people.filter(p => p.gender === 'F')

	if(males.length !== females.length) {
		throw new Error('A quantidade de homens e mulheres é diferente.')
	}

	const couples: [Person, Person][] = []

	const totalPairs = males.length

	for (let i = 0; i < totalPairs; i++) {
		couples.push([males[i], females[i]])
	}

	return couples
}

export function groupInPairs(people: Person[]): [Person, Person][] {
	return people.reduce((result: Person[][], item) => {
		const lastPair = result[result.length - 1]

		if (!lastPair || lastPair.length === 2) {
			result.push([item])
		} else {
			lastPair.push(item)
		}

		return result
	}, [] as Person[][]) as [Person, Person][]
}