import axios from 'axios'

export const openai = axios.create({
	baseURL: 'https://n8n.robot.rio.br/webhook/fix-gramar-issues'
})
