import Image from 'next/image'
import Link from 'next/link'
import cooper from '../../../assets/Medal-cooper.svg'
import gold from '../../../assets/Medal-gold.svg'
import silver from '../../../assets/Medal-silver.svg'

export default function StatsPanel({
  Stats,
}: {
  Stats: {
    totalSubscribers: number
    noInvites: number
    rankings: { name: string; position: number; invites: number }[]
  }
}) {
  return (
    <>
      <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6 flex flex-col">
        <h3 className="text-gray-400 text-sm mb-2">Total de Inscritos</h3>
        <p className="text-4xl font-heading font-medium text-blue">
          {Stats.totalSubscribers}
        </p>
        <div className="mt-auto pt-4">
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-200">
            Ver detalhes →
          </Link>
        </div>
      </div>

      <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6 flex flex-col">
        <h3 className="text-gray-400 text-sm mb-2">Sem Convites</h3>
        <p className="text-4xl font-heading font-medium text-purple">
          {Stats.noInvites}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Usuários que não convidaram ninguém
        </p>
        <div className="mt-auto pt-4">
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-200">
            Ver detalhes →
          </Link>
        </div>
      </div>

      <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6 flex flex-col">
        <h3 className="text-gray-400 text-sm mb-2">Taxa de Conversão</h3>
        <p className="text-4xl font-heading font-medium text-blue">
          {Math.round(
            ((Stats.totalSubscribers - Stats.noInvites) /
              Stats.totalSubscribers) *
              100
          )}
          %
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Usuários que convidaram pelo menos uma pessoa
        </p>
      </div>

      <div className="md:col-span-3 bg-gray-700 border border-gray-600 rounded-2xl p-6">
        <h3 className="font-heading font-semibold text-gray-200 text-xl mb-4">
          Ranking de Indicações
        </h3>

        <div className="space-y-4">
          {Stats.rankings.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-800 rounded-xl relative"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === 0
                    ? 'bg-[#F9F3A3]'
                    : index === 1
                      ? 'bg-[#E2E8F0]'
                      : 'bg-[#F8B195]'
                }`}
              >
                <span className="text-gray-900 font-bold">{user.position}</span>
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-200">{user.name}</p>
                <p className="text-sm text-gray-400">{user.invites} convites</p>
              </div>

              <div
                className={`w-8 h-8 ${
                  index === 0
                    ? 'text-[#F9F3A3]'
                    : index === 1
                      ? 'text-[#E2E8F0]'
                      : 'text-[#F8B195]'
                }`}
              >
                {index === 0 && (
                  <Image
                    src={gold}
                    alt="gold medal"
                    className="absolute top-0 right-8"
                    height={40}
                    width={40}
                  />
                )}
                {index === 1 && (
                  <Image
                    src={silver}
                    alt="silver medal"
                    className="absolute top-0 right-8"
                    height={40}
                    width={40}
                  />
                )}
                {index === 2 && (
                  <Image
                    src={cooper}
                    alt="cooper medal"
                    className="absolute top-0 right-8"
                    height={40}
                    width={40}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
