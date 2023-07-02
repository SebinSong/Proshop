'use strict'

export const MINS_MILLIS = 60 * 1000
export const HOURS_MILLIS = 60 * MINS_MILLIS
export const DAYS_MILLIS = 24 * HOURS_MILLIS
export const MONTHS_MILLIS = 30 * DAYS_MILLIS

export function genId () {
  const random = () => Math.random().toString(20).slice(2)
  return `${random()}_${random()}`
}

export function parseQueryString (str = '') {
  // use this util function along with useLocation().search hooks
  if (!str.startsWith('?')) return {}

  const obj = new URLSearchParams(str)
  const res = {}
  for (const [key, value] of obj.entries()) {
    res[key] = value
  }

  return res
}

export function formatMoney (amount) {
  return `$ ${Number(amount).toFixed(2)}`
}

export function addDecimals (num) {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export function checkAndParseFromLocalStorage (key) {
  const fetched = window.localStorage.getItem(key)

  return fetched ? JSON.parse(fetched) : null
}

export function saveToLocalStorage (key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value))
}
