'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { extendedNumber, extendedOrderNumber } from "@/lib/extended-number"
import { openai } from "@/services/openai"
import { textToSpeech } from "@/services/text-to-speech"

const participants: Person[] = [
	{
		id: 1,
		name: 'Felipe Leite',
		status: {
			wins: 3,
			defeats: 0
		},
		feature: 'que não perdoa quando vê um buraco na quadra',
		gender: 'M'
	},
	{
		id: 2,
		name: 'Etiene Santos',
		status: {
			wins: 0,
			defeats: 3
		},
		feature: 'que foi a maior revelação no beach no Garden City esse ano',
		gender: 'F'
	},
	{
		id: 3,
		name: 'Gabriel Maués',
		status: {
			wins: 2,
			defeats: 1
		},
		feature: 'com o saque mais rápido da competição',
		gender: 'M'
	},
	{
		id: 4,
		name: 'Klêizy Guimarães',
		status: {
			wins: 1,
			defeats: 2
		},
		feature: 'que evoluiu muito nos últimos jogos',
		gender: 'F'
	}
]

export default function Draw() {
	const { id } = useParams()

	const [drawnPairs, setDrawnPairs] = useState<Pair[]>([
		{
			player_1: participants[0],
			player_2: participants[1]
		},
		{
			player_1: participants[2],
			player_2: participants[3]
		}
	])
	const [audioSequenceBase64, setAudioSequenceBase64] = useState<string[]>([])
	const [isAudioGenerating, setIsAudioGenerating] = useState(false)
  	const [isAudioPlaying, setIsAudioPlaying] = useState(false)

	async function handleGenerateAudios() {
		try {
			setIsAudioGenerating(true)

			const { data: { data: introductionAudio } } = await textToSpeech.post<{ data: string }>('/', {
				text: 'ATENÇÃO BT LOVERS! Vamos iniciar o sorteio das duplas AGORA!'
			})

			const audioBase64Items: string[] = [`data:audio/mp3;base64,${introductionAudio}`]
			let orderNumber = 1

			for(const pair of drawnPairs) {
				const person1Feature = pair.player_1.feature ? `${pair.player_1.gender === 'M' ? 'Ele' : 'Ela'} ${pair.player_1.feature}...` : ''
				const person2Feature = pair.player_2.feature ? `${pair.player_2.gender === 'M' ? 'Ele' : 'Ela'} ${pair.player_2.feature}...` : ''
				const person1Composition = `Com ${extendedNumber(pair.player_1.status?.wins!)} vitórias e ${extendedNumber(pair.player_1.status?.defeats!)} derrotas, ${person1Feature} ${pair.player_1.name}!`
				const person2Composition = `Com ${extendedNumber(pair.player_2.status?.wins!)} vitórias e ${extendedNumber(pair.player_2.status?.defeats!)} derrotas, ${person2Feature} ${pair.player_2.name}...`
				const confirmationText = `${extendedOrderNumber(orderNumber)} dupla: ${pair.player_1.name} e ${pair.player_2.name}.`

				// const partsOfText = [
				// 	person1Composition,
				// 	person2Composition,
				// 	confirmationText,
				// 	'Boa sorte pra vocês!'
				// ]

				const text = `${person1Composition} ${person2Composition} ${confirmationText} Boa sorte pra vocês!`

				// for(const part of partsOfText) {
				// 	const { data: verifiedText } = await openai.post<{ result: string }>('/', {
				// 		text: part
				// 	})

				// 	console.log('verifiedText', verifiedText.result)

				// 	const { data: { data: base64Audio } } = await textToSpeech.post<{ data: string }>('/', {
				// 		text: verifiedText.result
				// 	})

				// 	audioBase64Items.push(`data:audio/mp3;base64,${base64Audio}`)
				// }

				const { data: verifiedText } = await openai.post<{ result: string }>('/', {
					text
				})

				console.log('verifiedText', verifiedText.result)

				const { data: { data: base64Audio } } = await textToSpeech.post<{ data: string }>('/', {
					text: verifiedText.result
				})

				audioBase64Items.push(`data:audio/mp3;base64,${base64Audio}`)

				orderNumber++
			}

			const { data: { data: endingAudio } } = await textToSpeech.post<{ data: string }>('/', {
				text: 'E essas foram as duplas sorteadas! O sorteio está ENCERRADO! UM ÓTIMO TORNEIO E QUE VENÇA O MELHOR!'
			})

			audioBase64Items.push(`data:audio/mp3;base64,${endingAudio}`)

			setAudioSequenceBase64(audioBase64Items)

			setIsAudioGenerating(false)
		} catch(e) {
			console.log(e)
		}
	}

	async function handlePlaySequence() {
		if (!audioSequenceBase64.length) {
			return
		}

		setIsAudioPlaying(true)

		let index = 0
		const audio = new Audio(audioSequenceBase64[index])

		async function playNext() {
			index++

			if (index < audioSequenceBase64.length) {
				audio.src = audioSequenceBase64[index]
				audio.play()

				await new Promise((r) => setTimeout(r, 1200))
			} else {
				setIsAudioPlaying(false)
			}
		}

		audio.onended = playNext
		audio.play()
	}

	useEffect(() => {
		handleGenerateAudios()
	}, [])
	
	return (
		<div className="flex flex-col gap-6">
			SORTEIO do torneio {id}

			<Button className="w-fit" onClick={handlePlaySequence} isWaiting={isAudioPlaying || isAudioGenerating}>
				Play
				<Play size={16} />
			</Button>

			<div className="text-sm text-gray-600">
				{audioSequenceBase64.length > 0 && `${audioSequenceBase64.length} áudios prontos!`}
			</div>

			{/* Incluir musica e tambores de suspense  */}
		</div>
	)
}