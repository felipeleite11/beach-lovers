import axios from 'axios'

export const textToSpeech = axios.create({
	baseURL: 'https://n8n.robot.rio.br/webhook/generate-voice'
})
