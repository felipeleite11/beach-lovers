import { useContext } from 'react'
import { GlobalContext } from '@/contexts/GlobalContext'

export function usePerson() {
	const context = useContext(GlobalContext)

	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context.person
}
