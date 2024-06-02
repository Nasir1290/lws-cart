'use client'

import { Locale } from '@/types/i18n'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { BsLamp } from 'react-icons/bs'
import { FcAlarmClock } from 'react-icons/fc'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoBedOutline } from 'react-icons/io5'
import { LuSofa } from 'react-icons/lu'
import { MdLaptopMac, MdOutlineTableRestaurant } from 'react-icons/md'

interface Props {
   allCategories: string
   locale: Locale
}

const dropdownVariants = {
   hidden: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
         ease: 'easeInOut',
         duration: 0.3,
      },
   },
   visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         delay: i * 0.05,
         ease: 'easeInOut',
         duration: 0.3,
      },
   }),
}

export default function CategoryMenu({ allCategories, locale }: Props) {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   return (
      <div
         onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}
         className="px-8 py-4 bg-primary cursor-pointer relative group"
      >
         <div className="flex items-center">
            <span className="text-white text-lg">
               <GiHamburgerMenu />
            </span>
            <span className="capitalize ml-2 text-white">{allCategories}</span>
         </div>
         <AnimatePresence>
            {isOpen && (
               <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute z-30 w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300"
               >
                  <motion.li custom={0} variants={dropdownVariants}>
                     <Link
                        href={`/${locale}/shop?category=sofa`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                     >
                        <LuSofa className="text-xl text-primary" />
                        <span className="ml-6 text-gray-600 text-sm">Sofa</span>
                     </Link>
                  </motion.li>
                  <motion.li custom={1} variants={dropdownVariants}>
                     <Link
                        href={`/${locale}/shop?category=table`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                     >
                        <MdOutlineTableRestaurant className="text-xl text-primary" />
                        <span className="ml-6 text-gray-600 text-sm">
                           Table
                        </span>
                     </Link>
                  </motion.li>
                  <motion.li custom={2} variants={dropdownVariants}>
                     <Link
                        href={`/${locale}/shop?category=bed`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                     >
                        <IoBedOutline className="text-xl text-primary" />
                        <span className="ml-6 text-gray-600 text-sm">Bed</span>
                     </Link>
                  </motion.li>
                  <motion.li custom={3} variants={dropdownVariants}>
                     <Link
                        href={`/${locale}/shop?category=lighting`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                     >
                        <BsLamp className="text-xl text-primary" />
                        <span className="ml-6 text-gray-600 text-sm">
                           Lighting
                        </span>
                     </Link>
                  </motion.li>
                  <motion.li custom={4} variants={dropdownVariants}>
                     <Link
                        href={`/${locale}/shop?category=electronics`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                     >
                        <MdLaptopMac className="text-xl text-primary" />
                        <span className="ml-6 text-gray-600 text-sm">
                           Electronics
                        </span>
                     </Link>
                  </motion.li>
                  <motion.li custom={5} variants={dropdownVariants}>
                     <Link
                        href={`/${locale}/shop?category=home+decor`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                     >
                        <FcAlarmClock className="text-xl text-primary" />
                        <span className="ml-6 text-gray-600 text-sm">
                           Home Decor
                        </span>
                     </Link>
                  </motion.li>
               </motion.ul>
            )}
         </AnimatePresence>
      </div>
   )
}
