const enToBn: { [key: string]: string } = {
   '0': '০',
   '1': '১',
   '2': '২',
   '3': '৩',
   '4': '৪',
   '5': '৫',
   '6': '৬',
   '7': '৭',
   '8': '৮',
   '9': '৯',
}

export const convertNumEnToBn = (englishNumber: number) => {
   const numberString = englishNumber.toString()
   const bengaliNumber = numberString
      .split('')
      .map((digit) => enToBn[digit] || digit)
      .join('')
   return bengaliNumber
}
