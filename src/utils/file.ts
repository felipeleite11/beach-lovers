import axios from "axios"
import { extname } from "path"

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export async function urlToFile(url: string | undefined | null): Promise<File | null> {
	if(!url) {
		return null
	}

	const extension = extname(url)

	const fileName = `file${extension}`

	const { data } = await axios.get<Blob>(url, {
		responseType: 'blob'
	})

	return new File([data], fileName, {
		type: data.type
	})
}
