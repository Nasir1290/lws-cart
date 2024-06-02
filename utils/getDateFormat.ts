export const getDateFormat = (timestamp: string): string => {
   const date = new Date(timestamp)
   return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
   })
}
