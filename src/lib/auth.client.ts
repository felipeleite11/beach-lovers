import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_URL
})

type ErrorCodes = typeof authClient.$ERROR_CODES & {
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: string
	INVALID_EMAIL_OR_PASSWORD: string
}

type ErrorTypes = Partial<
	Record<
		keyof ErrorCodes,
		string
	>
>

const errorCodes = {
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Já existe um usuário registrado com este e-mail.',
	INVALID_EMAIL_OR_PASSWORD: 'O e-mail ou senha está incorreto.'
} satisfies ErrorTypes

export function getBetterAuthErrorMessage(code: string) {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes]
	}

	return ''
}
