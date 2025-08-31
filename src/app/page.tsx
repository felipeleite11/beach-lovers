import MainMenu from "@/components/MainMenu";
import NavbarAuth from "@/components/NavbarAuth";
import Timeline from "@/components/Timeline";
import TournamentList from "@/components/TournamentList";

export default function Home() {
  return (
    <div className="grid grid-cols-[18rem_auto] grid-rows-[auto_1fr] min-h-screen">
      <NavbarAuth />

      <MainMenu />

      <main className="pl-10 pt-8 justify-self-center grid grid-cols-[3fr_2.5fr] h-[93vh]">
        <TournamentList />

        <Timeline />
      </main>
    </div>
  )
}
