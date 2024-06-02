import { Locale } from '@/types/i18n'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const colors = [
   { name: 'black', value: '#000000' },
   { name: 'white', value: '#FFFFFF' },
   { name: 'blue', value: '#0000FF' },
   { name: 'green', value: '#008000' },
   { name: 'gray', value: '#808080' },
   { name: 'wood', value: '#DEB887' },
   { name: 'glass', value: '#A0D3E8' },
   { name: 'steel', value: '#B0C4DE' },
]

export default function ColorFilter({ locale }: { locale: Locale }) {
   const [activeColors, setActiveColors] = useState<string[]>([])
   const searchParams = useSearchParams()
   const router = useRouter()

   const handleClick = (name: string) => {
      const isActive = activeColors.some((c) => c === name)
      if (isActive) {
         setActiveColors(activeColors.filter((c) => c !== name))
      } else setActiveColors([...activeColors, name])
   }

   useEffect(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('color')
      activeColors.forEach((c) => {
         params.append('color', c)
      })
      router.push(`/${locale}/shop?${params.toString()}`)
   }, [searchParams, activeColors, locale, router])

   return (
      <div className="pt-4">
         <h3 className="text-gray-800 mb-3 uppercase font-medium">Color</h3>
         <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
               const isActive = activeColors.some((c) => c === color.name)
               const activeStyle = isActive
                  ? {
                       backgroundColor: color.value,
                       border: `4px solid ${color.value}`,
                    }
                  : {
                       border: `4px solid ${color.value}`,
                    }
               return (
                  <button
                     title={color.name}
                     onClick={() => handleClick(color.name)}
                     key={color.value}
                     className={`w-8 h-8 rounded-full flex justify-center items-center ${color.value === '#FFFFFF' ? 'ring-1 ring-slate-400' : ''}`}
                     style={activeStyle}
                  >
                     {isActive && color.value === '#FFFFFF' && (
                        <FaCheck className="text-primary" />
                     )}
                  </button>
               )
            })}
         </div>
      </div>
   )
}
