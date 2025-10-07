'use client'

import { useEffect, useState } from "react"

type Location = {
	latitude: number
	longitude: number
}

type LocationReturn = {
	location: Location | null | undefined
	isFetching: boolean
}

export function useGeolocation(): LocationReturn {
	const [isFetching, setIsFetching] = useState(true)
	const [location, setLocation] = useState<Location | undefined | null>(undefined)

	useEffect(() => {
		setIsFetching(true)

		if (!("geolocation" in navigator)) {
			console.error("Geolocalização não é suportada neste navegador.")
			return
		}

		function onSuccess(position: GeolocationPosition) {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
		}

		function onError(error: GeolocationPositionError) {
			console.warn("Erro ao obter localização:", error.message)

			setLocation(null)
		}

		navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true })
	}, [])

	useEffect(() => {
		if(location || location === null) {
			setIsFetching(false)
		}
	}, [location])

	return {
		location,
		isFetching
	}
}
