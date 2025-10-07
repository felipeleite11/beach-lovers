export function generateGoogleMapsLink({ latitude, longitude }: Position, options?: { navigationMode: boolean }) {
	if(options?.navigationMode) {
		return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
	}

	return `https://www.google.com/maps?q=${latitude},${longitude}`
}
