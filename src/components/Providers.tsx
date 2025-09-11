'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "./ui/sonner"

export const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
		<QueryClientProvider client={queryClient}>
			{children}

			<Toaster />
    	</QueryClientProvider>
	</ThemeProvider>
  )
}
