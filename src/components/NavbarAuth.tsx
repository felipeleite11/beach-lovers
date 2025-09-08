'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from 'next/link'
import ProfileContainer from "@/components/ProfileContainer"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import { Button } from './ui/button'
import { authClient } from '@/lib/auth.client'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export default function NavbarAuth() {
	const router = useRouter()

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace('/')
				}
			}
		})
	}

	return (
		<nav className="col-span-2 flex gap-6 justify-between items-center bg-white dark:bg-slate-950 border-b border-b-slate-300 dark:border-b-slate-700 px-4 h-fit">
			<Link href="/home">
				<Image alt="" width={200} height={100} src="/images/logo.png" className="h-13 object-contain my-1" />
			</Link>

			<div className="flex gap-6 items-center">
				<ProfileContainer />

				<ThemeSwitcher />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button onClick={handleSignOut} className="transition-all w-10 h-10 flex justify-center items-center bg-gray-200 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-black dark:text-white cursor-pointer">
							<LogOut size={16} />
						</Button>
					</TooltipTrigger>

					<TooltipContent>
						<p>Sair da conta</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</nav>
	)
}
