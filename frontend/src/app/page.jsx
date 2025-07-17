// src/app/page.tsx

'use client'
import Link from 'next/link'
import {
  LockClosedIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  SwatchIcon,
  BanknotesIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import CurrentTime from '../components/CurrentTime'
import FloatingSpotifyIcon from '../components/FloatingSpotifyIcon'
import ThemeModal from '../components/ThemeModal'
import { useState } from 'react';


const sidebarItems = [
  { label: 'Pomo', icon: ClockIcon, href: '/pomodoro' },
  { label: 'To-do', icon: ClipboardDocumentListIcon, href: '/todo' },
  { label: 'Schedule', icon: CalendarDaysIcon, href: '/schedule' },
  { label: 'Theme', icon: SwatchIcon, href: '/theme' },
  { label: 'Expense Tracker', icon: BanknotesIcon, href: '/expenses' },
  { label: 'Flash cards', icon: AcademicCapIcon, href: '/flashcards' },
  { label: 'Status', icon: ChartBarIcon, href: '/status' },
]

export default function Home() {
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  return (
    <main className="min-h-screen relative bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Unlock more button above sidebar */}
      <div className="fixed top-2 left-1 z-30 md:top-4 md:left-4 flex flex-col items-center space-y-2">
        <Link
          href="/unlock"
          className="flex items-center px-3 py-2 md:px-4 md:py-2.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold rounded-xl shadow-lg transition text-xs md:text-sm"
        >
          <LockClosedIcon className="w-5 h-5 md:w-6 md:h-6 mr-1" />
          <span className="font-bold">Unlock more</span>
        </Link>
        {sidebarItems.map(({ label, icon: Icon, href }) =>
          label === 'Theme' ? (
            <div
              key={label}
              onClick={() => setThemeModalOpen(true)}
              className="flex flex-col items-center group bg-white/80 backdrop-blur-md rounded-xl shadow-xl w-14 md:w-20 py-3 px-1 md:py-4 md:px-2 md:rounded-2xl hover:bg-indigo-100 transition-all cursor-pointer"
              style={{ userSelect: 'none' }}
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-indigo-800 mb-0.5" />
              <span className="text-[9px] md:text-xs text-gray-700 group-hover:text-indigo-800 text-center font-medium hidden md:block leading-tight">
                {label}
              </span>
            </div>
          ) : (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center group bg-white/80 backdrop-blur-md rounded-xl shadow-xl w-14 md:w-20 py-3 px-1 md:py-4 md:px-2 md:rounded-2xl hover:bg-indigo-100 transition-all"
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-indigo-800 mb-0.5" />
              <span className="text-[9px] md:text-xs text-gray-700 group-hover:text-indigo-800 text-center font-medium hidden md:block leading-tight">
                {label}
              </span>
            </Link>
          )
        )}
      </div>
      {/* Modal for Theme */}
      <ThemeModal open={themeModalOpen} onClose={() => setThemeModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
        <p className="text-gray-700">Ibutang diri ang imong theme options o settings.</p>
      </ThemeModal>
      {/* Top bar with login/signup */}
      <header className="w-full flex justify-end items-center px-4 py-4 md:px-8 md:py-6 fixed top-0 left-0 z-10 bg-transparent">
        <div className="flex space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white/80 rounded-lg shadow hover:bg-indigo-50 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>
      {/* Main content placeholder, responsive margin */}
      <div className="pt-20 md:pt-28 pl-24 md:pl-32"></div>

      {/* World Clock in bottom right */}
      <div className="fixed bottom-4 right-4 z-20">
        <CurrentTime />
      </div>

      <FloatingSpotifyIcon />
    </main>
  )
}


