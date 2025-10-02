import React from 'react'
import ThemeSwitcher from "@/components/ThemeSwitcher"
import Image from "next/image"
import Link from 'next/link'

export default function NavbarPublic() {
	return (
		<nav className="col-span-2 flex gap-6 justify-between items-center bg-white dark:bg-slate-950 border-b border-b-slate-300 dark:border-b-slate-700 pr-4 md:px-4 h-fit">
			<Link href="/">
				<Image alt="" width={170} height={100} src="/images/logo.png" className="h-12 object-contain my-1.5" />
			</Link>

			<div className="flex gap-6 items-center">
				<ThemeSwitcher />
			</div>
		</nav>
	)
}
