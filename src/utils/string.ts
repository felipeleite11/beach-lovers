export function generateSlug(text: string) {
	return text
		.toString()                      // garante que seja string
		.normalize('NFD')                // separa acentos
		.replace(/[\u0300-\u036f]/g, '') // remove acentos
		.toLowerCase()                   // deixa em minúsculas
		.trim()                          // remove espaços no início/fim
		.replace(/[^a-z0-9\s-]/g, '')    // remove caracteres especiais
		.replace(/\s+/g, '-')            // substitui espaços por hífen
		.replace(/-+/g, '-')
}

interface PluralizeOptions {
	emptyTerm?: string
	singularTerm: string
	pluralTerm?: string
}

export function pluralize(data: any[] | number | undefined, options: PluralizeOptions) {
	let length = 0

	if (!data) {
		length = 0
	} else if (Array.isArray(data)) {
		length = data.length
	} else if (!isNaN(data) && isFinite(data)) {
		length = data
	}

	let term = options.emptyTerm || 'Nenhum'

	if (length === 1) {
		term = options.singularTerm
	}

	if (length > 1) {
		term = options.pluralTerm || `${options.singularTerm}s`
	}

	return `${length} ${term}`
}
