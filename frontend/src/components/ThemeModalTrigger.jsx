'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SwatchIcon } from '@heroicons/react/24/outline'

export default function ThemeModalTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-indigo-100 transition"
      >
        <SwatchIcon className="w-6 h-6 text-indigo-600" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 w-80 shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose a Theme</h2>
              <div className="space-y-2">
                <button className="w-full py-2 px-3 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium">
                  Light
                </button>
                <button className="w-full py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium">
                  Dark
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
