import Timeline from "@/components/Timeline"
import TournamentList from "@/components/TournamentList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
	return (
		<>
			<Tabs defaultValue="tournaments" className="xl:hidden">
				<TabsList className="bg-transparent">
					<TabsTrigger value="tournaments" className="cursor-pointer h-12 px-4 text-lg border-0 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-white rounded-none transition-all">Torneios</TabsTrigger>
					<TabsTrigger value="feed" className="cursor-pointer h-12 px-4 text-lg border-0 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-white rounded-none transition-all">Feed</TabsTrigger>
				</TabsList>

				<TabsContent value="tournaments" className="pt-6">
					<TournamentList />
				</TabsContent>

				<TabsContent value="feed" className="pt-6">
					<Timeline />
				</TabsContent>
			</Tabs>

			<div className="justify-self-center hidden xl:grid xl:grid-cols-[3fr_2.5fr] h-[84vh] ">
				<TournamentList />

				<Timeline />
			</div>
		</>
	)
}
