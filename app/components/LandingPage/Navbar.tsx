"use client"

import BrandDots from "../GoogleBrandedDots"

export default function Navbar() {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-3 bg-white">
      <div className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-2 shadow-sm w-fit">
        <BrandDots size={16} />
        <p className="font-semibold text-xs sm:text-sm text-gray-800 whitespace-nowrap">
          GDGoC <span className="text-blue-500 font-bold">Guestbook</span>
        </p>
      </div>
    </div>
  )
}