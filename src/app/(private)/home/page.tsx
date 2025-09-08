'use client'

import Timeline from "@/components/Timeline";
import TournamentList from "@/components/TournamentList";
// import { authClient } from "@/lib/auth.client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  // const router = useRouter()

  // async function teste() {
  //   await authClient.signOut({
  //     fetchOptions: {
  //       onSuccess: () => {
  //         router.replace('/signin')
  //       }
  //     }
  //   })
  // }

  return (
    <div className="justify-self-center grid grid-cols-[3fr_2.5fr] h-[84vh]">
      <TournamentList />

      {/* espaço publicitário para arenas e empresas */}

      {/* exibir classificados de raquetes e acessórios, permitir anúncios dos usuários */}

      <Timeline />
    </div>
  )
}
