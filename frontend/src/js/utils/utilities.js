export function genId () {
  const random = () => Math.random().toString(20).slice(2)
  return `${random()}_${random()}`
}