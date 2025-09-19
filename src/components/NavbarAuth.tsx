import React from 'react'
import { Menu } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import ProfileContainer from "@/components/ProfileContainer"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import { SheetTrigger } from './ui/sheet'

export default function NavbarAuth() {
	return (
		<nav className="col-span-2 flex gap-6 justify-between items-center bg-white dark:bg-slate-950 border-b border-b-slate-300 dark:border-b-slate-700 px-4 h-fit">
			<div className="flex gap-3">
				<SheetTrigger>
					<Menu size={24} className="xl:hidden cursor-pointer hover:opacity-70 transition-opacity" />
				</SheetTrigger>
				
				<Link href="/home">
					<Image alt="" width={200} height={100} src="/images/logo.png" className="h-13 object-contain my-1" />
				</Link>
			</div>

			<div className="flex gap-6 items-center">
				<ProfileContainer />

				<ThemeSwitcher />
			</div>
		</nav>
	)
}
