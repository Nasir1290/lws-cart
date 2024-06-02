export const makeShort = (str: string, length: number): string => {
   return str.length <= length ? str : str.slice(0, length - 3).trim() + '...'
}
