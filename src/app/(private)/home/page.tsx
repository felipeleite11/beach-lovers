import Timeline from "@/components/Timeline";
import TournamentList from "@/components/TournamentList";

export default function Home() {
  return (
    <div className="justify-self-center grid grid-cols-[3fr_2.5fr] h-[84vh]">
      <TournamentList />

      {/* espaço publicitário para arenas e empresas */}

      {/* exibir classificados de raquetes e acessórios, permitir anúncios dos usuários */}

      {/* Webscraping para obter ofertas de raquetes no Mercado Livre, Shopee, Top Spin, etc. */}

      {/* Fazer um ranking geral de atletas */}

      <Timeline />
    </div>
  )
}
