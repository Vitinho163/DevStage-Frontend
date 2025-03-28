import AdminHeader from './admin-header'
import DashboardTabs from './dashboard-tabs'

export default function AdminDashboard() {
  return (
    <div className="min-h-dvh flex flex-col">
      <AdminHeader />
      <main className="flex-1 pt-16 px-4 pb-4 max-w-7x1 mx-auto w-full">
        <DashboardTabs />
      </main>
    </div>
  )
}
