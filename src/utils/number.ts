import { differenceInYears, formatDuration, intervalToDuration } from "date-fns"
import { ptBR } from 'date-fns/locale'

export function calculateAge(birthdate: Date) {
	return `${differenceInYears(new Date(), birthdate)} anos`
}

export function getDuration(earlierDate: Date) {
	return formatDuration(
		intervalToDuration({
			start: earlierDate,
			end: new Date()
		}),
		{ 
			locale: ptBR,
			format: ['months'],
			zero: false
		}
	)
}

export function extractNumbers(text: string) {
	const numbers = text.match(/\d+/g)
  
	return numbers ? numbers.join('') : ''
}

export function getRandomItem<T = any>(array: any[]): T {
	const randonIndex = Math.floor(Math.random() * array.length)

  	return array[randonIndex]
}