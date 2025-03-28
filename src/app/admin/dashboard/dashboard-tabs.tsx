'use client'

import { Button } from '@/components/button'
import { BarChart3, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import StatsPanel from './stats-panel'

const Stats = {
  totalSubscribers: 1000,
  noInvites: 200,
  rankings: [
    { position: 1, name: 'John Due', invites: 50 },
    { position: 2, name: 'Fulano', invites: 40 },
    { position: 3, name: 'João Victor', invites: 30 },
  ],
}

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<'chat' | 'stats'>('stats')

  return (
    <>
      <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2">
        <Button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === 'stats'
              ? 'bg-gray-700 text-blue'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <BarChart3 className="size-4 inline-block mr-2" />
          Estatísticas
        </Button>
        <Button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === 'chat'
              ? 'bg-gray-700 text-blue'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <MessageSquare className="size-4 inline-block mr-2" />
          Code AI
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {activeTab === 'stats' ? <StatsPanel Stats={Stats} /> : 'Code AI'}
      </div>
    </>
  )
}
