export const isOpen = () => {
  const targetTime = new Date('2024-03-18T19:00:00+09:00')
  const current = new Date()
  return current < targetTime
}
