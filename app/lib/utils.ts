import { getCookie, setCookie } from 'cookies-next'

export function setNewCookie(
  days: number | undefined,
  value: any,
  name: string
) {
  let date = undefined
  if (days) {
    date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  }
  setCookie(name, value, {
    expires: date
  })
}

export function getRecommendations() {
  const recommendations = JSON.parse(
    (getCookie('productRecommendations') as string) || '[]'
  ) as string[]

  const frequencyMap = recommendations.reduce(
    (acc: Record<string, number>, productId: string) => {
      acc[productId] = (acc[productId] || 0) + 1
      return acc
    },
    {}
  )

  const sortedProductIds = Object.keys(frequencyMap).sort(
    (a, b) => frequencyMap[b] - frequencyMap[a]
  )

  return sortedProductIds
}

export function updateRecommendationsCookie(id: string) {
  const cookie = getCookie('productRecommendations')
  if (!cookie) {
    setNewCookie(1, [id], 'productRecommendations')
    return
  }
  const recommendations = JSON.parse(cookie)
  const newRecommendations = [...recommendations, id]
  setNewCookie(1, newRecommendations, 'productRecommendations')
}
