'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const framerSlide = {
   initial: { x: '-612px', opacity: 0 },
   animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
}

export default function ImageGallery({ images }: { images: string[] }) {
   const [index, setIndex] = useState<number>(0)

   return (
      <div>
         <AnimatePresence mode="wait">
            <motion.div
               variants={framerSlide}
               initial="initial"
               animate="animate"
               key={`image-gallery-${index}`}
               layoutId={`image-gallery-${index}`}
               className="relative h-[500px]"
            >
               <Image
                  fill
                  src={images[index]!}
                  alt="product"
                  className="object-cover"
               />
            </motion.div>
         </AnimatePresence>
         <div className="grid grid-cols-5 gap-4 mt-4">
            {images.map((image, i) => (
               <motion.div
                  layoutId={`image-gallery-${i}`}
                  onClick={() => setIndex(i)}
                  key={i}
                  className="relative w-full h-20"
               >
                  <Image
                     fill
                     src={image}
                     alt={`Product Thumbnail - ${i + 1}`}
                     className={`cursor-pointer border-2  object-cover ${index === i ? 'border-primary' : 'border-gray-400 opacity-70'}`}
                  />
               </motion.div>
            ))}
         </div>
      </div>
   )
}
