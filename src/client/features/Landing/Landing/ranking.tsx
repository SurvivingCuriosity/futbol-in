import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface RankingProps {
  city?: string
}

const topUsers = [
  {
    rank: 1,
    name: "Carlos M.",
    avatar: "/male-user-avatar.png",
    tables: 127,
    city: "Madrid",
  },
  {
    rank: 2,
    name: "Ana R.",
    avatar: "/female-user-avatar.png",
    tables: 98,
    city: "Barcelona",
  },
  {
    rank: 3,
    name: "Javier L.",
    avatar: "/user-avatar-male-2.jpg",
    tables: 84,
    city: "Valencia",
  },
  {
    rank: 4,
    name: "María S.",
    avatar: "/user-avatar-female-2.jpg",
    tables: 76,
    city: "Sevilla",
  },
  {
    rank: 5,
    name: "David P.",
    avatar: "/user-avatar-male-3.jpg",
    tables: 69,
    city: "Bilbao",
  },
]

export function Ranking({ city }: RankingProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-700" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <section id="ranking" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Ranking en Vivo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Top Contribuidores{" "}
            {city && (
              <>
                de <span className="text-accent">{city}</span>
              </>
            )}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Los usuarios que más futbolines han añadido a la comunidad
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {topUsers.map((user) => (
              <div
                key={user.rank}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  user.rank === 1
                    ? "bg-gradient-to-r from-accent/10 to-transparent border-accent/50 hover:border-accent"
                    : "bg-card border-border hover:border-accent/30"
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex items-center justify-center">{getRankIcon(user.rank)}</div>

                  {/* Avatar */}
                  <div className="w-16 h-16 border-2 border-accent/30">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} width={100} height={100}/>
                    <div>{user.name.charAt(0)}</div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.city}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">{user.tables}</div>
                    <p className="text-sm text-muted-foreground">futbolines</p>
                  </div>
                </div>

                {/* Hover Effect */}
                {user.rank === 1 && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* View Full Ranking Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all font-medium">
              Ver Ranking Completo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
