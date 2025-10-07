'use client'

import { useEffect, useRef } from "react"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"
import colors from 'tailwindcss/colors'
import { cn } from "@/lib/utils"

setOptions({ 
	key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	language: "pt-BR",
	region: "BR",
	v: "weekly"
})

interface MapProps {
	latitude: number
	longitude: number
	zoom?: number
	className?: string
}

export function Map2({ latitude, longitude, zoom = 16, className }: MapProps) {
	const mapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		async function initMap() {
			const { Map, Circle, InfoWindow } = await importLibrary("maps")
			const { AdvancedMarkerElement } = await importLibrary("marker")

			if (mapRef.current) {
				const map = new Map(mapRef.current, {
					zoom,
					center: {
						lat: latitude,
						lng: longitude
					},
					mapId: '4504f8b37365c3d0'
				})

				new AdvancedMarkerElement({
					map,
					position: { lat: latitude, lng: longitude }
				})

				new Circle({
					map,
					strokeColor: colors.sky[700],
					strokeOpacity: 0.8,
					strokeWeight: 1,
					fillColor: colors.sky[500],
					fillOpacity: 0.3,
					center: {
						lat: latitude,
						lng: longitude
					},
					radius: 350
				})

				const balloon = document.createElement('div')
				balloon.textContent = 'J.V.'
				balloon.style.background = colors.sky[600]
				balloon.style.padding = '4px 8px'
				balloon.style.borderRadius = '4px'
				balloon.style.fontSize = '11px'
				balloon.style.fontWeight = 'bold'
				balloon.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'

				const infoWindow = new InfoWindow({
					content: `
						<div class="flex gap-4 text-slate-800 w-full h-full">
							<img src="/images/boy.jpg" class="w-11 h-11 rounded-full" />
							
							<div class="flex flex-col gap-1">
								<h1 class="text-slate-800 font-bold text-md">João Victor Souza</h1>
								<span class="text-xs">Masculino - Categoria D</span>
							</div>
						</div>
					`,
					maxWidth: 200
				})

				const marker = new AdvancedMarkerElement({
					map,
					position: {
						lat: latitude + 0.002,
						lng: longitude + 0.002
					},
					content: balloon
				})

				marker.addListener('click', () => {
					infoWindow.open({
						anchor: marker,
						map
					})
				})
			}
		}

		initMap()
	}, [])

	return (
		<div className={cn('w-full h-96', className)} ref={mapRef} />
	)
}