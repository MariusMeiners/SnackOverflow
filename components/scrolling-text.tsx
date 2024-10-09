'use client'

import React from 'react'

function ScrollingText() {
  const text = "Live now in Berlin & Dubai"

  return (
    <div className="relative w-full overflow-hidden bg-white py-3">
      <div className="relative flex">
        <div className="animate-scroll flex whitespace-nowrap">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="mx-3 text-sm font-semibold text-gray-800"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent" />
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ScrollingText