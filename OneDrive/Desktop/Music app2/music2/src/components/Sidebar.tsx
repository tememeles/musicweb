import React from 'react'
import {
  Home,
  Compass,
  Disc3,
  Users,
  Clock,
  TrendingUp,
  Heart,
  List,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react'

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 max-h-fit bg-gray-900 text-white px-2 pt-2 pb-48 flex flex-col justify-between">
      {/* Top Sections */}
      <div className="flex flex-col gap-6">
        {/* App Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-pink-500">Melodies</h1>
        </div>

        {/* Menu Section */}
        <div>
          <h2 className="text-xs uppercase text-gray-400 mb-2">Menu</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Home size={10} />
              <span>Home</span>
            </li>
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Compass size={10} />
              <span>Discover</span>
            </li>
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Disc3 size={10} />
              <span>Albums</span>
            </li>
            <li className="bg-pink-600 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Users size={10} />
              <span>Artists</span>
            </li>
          </ul>
        </div>

        {/* Library Section */}
        <div>
          <h2 className="text-xs uppercase text-gray-400 mb-2">Library</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Clock size={10} />
              <span>Recently Added</span>
            </li>
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp size={10} />
                <span>Most played</span>
              </div>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </li>
          </ul>
        </div>

        {/* Playlist and Favorite Section */}
        <div>
          <h2 className="text-xs uppercase text-gray-400 mb-2">Playlist and favorite</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Heart size={10} />
              <span>Your favorites</span>
            </li>
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <List size={10} />
              <span>Your playlist</span>
            </li>
          </ul>
        </div>

        {/* General Section */}
        <div className="">
          <h2 className="text-xs uppercase text-gray-400 mb-2">General</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3">
              <Plus size={10} />
              <span>Add playlist</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Setting Section */}
      <div>
        <h2 className="text-xs uppercase text-gray-400 mb-2">Setting</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
            <Settings size={10} />
            <span>Setting</span>
          </li>
          <li className="hover:bg-red-600 px-3 py-2 rounded cursor-pointer flex items-center gap-3 text-red-400 hover:text-white transition-colors">
            <LogOut size={10} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
