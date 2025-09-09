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