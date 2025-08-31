interface Arena {
	id: number
	name: string
	image: string
	gallery: GalleryImage[]
	region: Region
	modalities?: string[]
	tournaments?: Tournament[]
	address: string
	contacts?: string[]
	business_hours?: string
	day_use?: string
	position?: Position
}

interface GalleryImage {
	url: string
	title: string
	description?: string
}

interface Region {
	id: number
	name: string
}

interface Position {
	lat: number
	lng: number
}