import React from 'react';

export default function ThemeModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      style={{ background: 'transparent' }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 relative w-80 max-w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-indigo-600 text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
} 