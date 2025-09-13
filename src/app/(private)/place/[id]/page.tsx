import { useParams } from "next/navigation"

export default function Place() {
	const { id } = useParams<{ id: string }>()

	return (
		<div>Local {id}</div>
	)
}