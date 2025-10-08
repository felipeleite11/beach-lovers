'use client'

import { useEffect, useRef, ReactElement } from "react"
import ReactDOM from 'react-dom/client'
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"
import colors from 'tailwindcss/colors'
import { cn } from "@/lib/utils"

setOptions({
	key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	language: "pt-BR",
	region: "BR",
	v: "weekly",
	libraries: ['places']
})

type MapProps = {
	center: Position,
	zoom?: number
	className?: string
	markers?: (Position & { infoComponent: ReactElement })[]
	rangeSize?: number
}

let currentInfoWindow: any = null
const infoWindows: any = []

export function Map({ center, zoom = 16, className, markers, rangeSize }: MapProps) {
	const mapRef = useRef<HTMLDivElement>(null)

	async function createMarker(map: any, position: Position, content: any, info?: any) {
		const { InfoWindow } = await importLibrary("maps")
		const { AdvancedMarkerElement } = await importLibrary("marker")

		const marker = new AdvancedMarkerElement({
			position,
			map
		})

		if(info) {
			const infoWindow = new InfoWindow({
				content
			})
			
			marker.addListener("click", () => {
				if (currentInfoWindow) {
					currentInfoWindow.close()
				}
	
				infoWindow.open(map, marker)
		
				currentInfoWindow = infoWindow
			})
		}

		return marker
	}

	useEffect(() => {
		async function initMap() {
			const { Map, Circle, InfoWindow } = await importLibrary("maps")
			const { AdvancedMarkerElement } = await importLibrary("marker")

			if (mapRef.current) {
				const map = new Map(mapRef.current, {
					zoom,
					center: {
						lat: center.latitude,
						lng: center.longitude
					},
					mapId: '4504f8b37365c3d0'
				})

				const userPositionMarker = new AdvancedMarkerElement({
					map,
					position: { 
						lat: center.latitude, 
						lng: center.longitude 
					},
					title: 'Você está aqui'
				})

				const userPositionInfoWindow = new InfoWindow({
					ariaLabel: 'Sua localização',
					content: '<div class="flex flex-col gap-4 items-center text-slate-800 font-semibold"><img src="/images/hand.png" class="animate-pendulum [transform-origin:50%_80%] duration-400 w-10 object-contain" />Você está aqui.</div>',
					maxWidth: 200
				})

				infoWindows.push(userPositionInfoWindow)

				setTimeout(() => {
					userPositionInfoWindow.open({
						anchor: userPositionMarker,
						map
					})
				}, 400)

				setTimeout(() => {
					userPositionInfoWindow.close()
				}, 2000)

				if(rangeSize) {
					new Circle({
						map,
						strokeColor: colors.sky[700],
						strokeOpacity: 0.8,
						strokeWeight: 1,
						fillColor: colors.sky[500],
						fillOpacity: 0.3,
						center: {
							lat: center.latitude,
							lng: center.longitude
						},
						radius: rangeSize
					})
				}

				markers?.forEach(async marker => {
					// function Balloon() {
					// 	return (
					// 		<div className="bg-sky-600 px-1 py-2 rounded-sm text-sm font-bold shadow-md">
					// 			{marker.title}
					// 		</div>
					// 	)
					// }

					// const balloonContainer = document.createElement('div')
					// const balloon = ReactDOM.createRoot(balloonContainer)
					// balloon.render(<Balloon />)

					// console.log('balloonContainer', balloonContainer)

					// TODO: Melhoria: criar o balloon abaixo com React

					const balloon = document.createElement('div')
					balloon.textContent = marker.title || '',
					balloon.style.background = colors.sky[600]
					balloon.style.color = colors.white
					balloon.style.padding = '4px 8px'
					balloon.style.borderRadius = '4px'
					balloon.style.fontSize = '11px'
					balloon.style.fontWeight = 'bold'
					balloon.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'

					// TODO: Melhoria: criar cada marcador já com seu infoWindow correspondente
					
					// await createMarker(
					// 	map,
					// 	{
					// 		latitude: marker.latitude,
					// 		longitude: marker.longitude
					// 	},
					// 	'<div>teste</div>',
					// 	'<div>teste info window</div>'
					// )

					const advMarker = new AdvancedMarkerElement({
						map,
						position: {
							lat: marker.latitude,
							lng: marker.longitude
						},
						content: balloon
					})

					const infoContainer = document.createElement('div')
					const info = ReactDOM.createRoot(infoContainer)
					info.render(marker.infoComponent)

					const infoWindow = new InfoWindow({
						ariaLabel: marker.title,
						content: infoContainer,
						maxWidth: 350
					})

					infoWindows.push(infoWindow)

					advMarker.addListener('click', () => {
						infoWindows.forEach((infoWindow: any) => infoWindow.close())

						infoWindow.open({
							anchor: advMarker,
							map
						})
					})
				})
			}
		}

		initMap()
	}, [])

	return (
		<div className={cn('google-map w-full h-full', className)} ref={mapRef} />
	)
}