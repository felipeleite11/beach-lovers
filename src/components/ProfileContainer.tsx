'use client'

import React from 'react'
import { LogOut, Settings, User2Icon } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth.client'

export default function ProfileContainer() {
	const router = useRouter()

	const { data } = authClient.useSession()

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace('/')
				}
			}
		})
	}

	if(!data?.user) {
		return null
	}

	const user = data.user

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center gap-2 dark:hover:bg-slate-900 h-13 px-3 cursor-pointer">
					<Avatar className="w-10 h-10">
						{user.image && <AvatarImage src={user.image} className="object-cover" />}
						<AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
					</Avatar>

					<span>{user.name}</span>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link href="/profile" className="hover:opacity-80 w-full flex gap-2 items-center">
						<User2Icon size={16} />
						Meu perfil
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<Link href="/settings" className="hover:opacity-80 w-full flex gap-2 items-center">
						<Settings size={16} />
						Configurações
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
					<div className="hover:opacity-80 w-full flex gap-2 items-center">
						<LogOut size={16} />
						Sair
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
