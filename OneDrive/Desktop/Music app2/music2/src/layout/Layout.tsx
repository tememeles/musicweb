import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar on the left */}
      <div className="w-64 bg-gray-900">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Top content (Home, etc.) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer at the bottom */}
        
          <Footer />
        
      </div>
    </div>
  )
}

export default Layout
