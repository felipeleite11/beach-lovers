import { useContext } from 'react'
import { GlobalContext } from '@/contexts/GlobalContext'
import { User } from 'better-auth'

export function useUser() {
	const context = useContext(GlobalContext)

	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context.user
}
