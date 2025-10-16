import React from 'react'
import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-100 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Melodies is a website that has been created for over 5 years now and it is one of the most famous music player websites in the world. In this website you can listen and download songs for free. Also if you want no limitation you can buy our premium pass.
          </p>
        </div>

        {/* Melodies Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Melodies</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Songs</li>
            <li className="hover:text-white cursor-pointer">Radio</li>
            <li className="hover:text-white cursor-pointer">Podcast</li>
          </ul>
        </div>

        {/* Access Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Access</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Explore</li>
            <li className="hover:text-white cursor-pointer">Artists</li>
            <li className="hover:text-white cursor-pointer">Playlists</li>
            <li className="hover:text-white cursor-pointer">Albums</li>
            <li className="hover:text-white cursor-pointer">Trending</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Policy</li>
            <li className="hover:text-white cursor-pointer">Social Media</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-10 text-center text-sm text-gray-400">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-bold text-lg">
          Melodies
        </span>{' '}
        © {new Date().getFullYear()} — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
