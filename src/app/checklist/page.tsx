type ItemStatus = 'todo' | 'doing' | 'done'

interface ItemProps {
	description: string
	status: ItemStatus
}

const items: ItemProps[] = [
	{
		description: 'Página de perfil',
		status: 'todo'
	},
	{
		description: 'Login com Google',
		status: 'doing'
	},
	{
		description: 'Teste 3',
		status: 'done'
	}
]

export default function Checklist() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col items-center p-24 gap-10">
				<h1 className="font-bold text-xl">Checklist</h1>

				<ul className="flex flex-col gap-1 w-96 border-t border-white">
					{items.map(item => (
						<li key={item.description} className="flex items-center gap-8 p-1 justify-between border-b border-white">
							<span className="text-sm font-bold">{item.description}</span>
							<span className="text-sm bg-white p-1 rounded-md text-slate-800">{item.status}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}