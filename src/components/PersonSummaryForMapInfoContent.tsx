import { Person } from "@/types/Person"

interface PersonSummaryForMapInfoContentProps {
	person: Person
}

export function PersonSummaryForMapInfoContent({ person }: PersonSummaryForMapInfoContentProps) {
	return (
		<div className="text-red-500 font-bold text-lg">
			{person.name}
		</div>
	)
}