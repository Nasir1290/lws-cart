const getRandomBoolean = (): boolean => {
   return Math.random() > 0.5
}

const alpha: string[] = [
   'A',
   'B',
   'C',
   'D',
   'E',
   'F',
   'G',
   'H',
   'I',
   'J',
   'K',
   'L',
   'M',
   'N',
   'O',
   'P',
   'Q',
   'R',
   'S',
   'T',
   'U',
   'V',
   'W',
   'X',
   'Y',
   'Z',
]

export const generateRandomInvoice = (length: number): string => {
   if (length <= 0) {
      throw new Error('Length must be a positive integer')
   }
   let invoice = ''
   for (let i = 0; i < length; i++) {
      if (getRandomBoolean()) {
         invoice += alpha[Math.floor(Math.random() * 26)]
      } else {
         invoice += Math.floor(Math.random() * 10).toString()
      }
   }
   return invoice
}
