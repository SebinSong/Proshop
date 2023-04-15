'use strict'

export const MINS_MILLIS = 60 * 1000
export const HOURS_MILLIS = 60 * MINS_MILLIS
export const DAYS_MILLIS = 24 * HOURS_MILLIS
export const MONTHS_MILLIS = 30 * DAYS_MILLIS

export function genId () {
  const random = () => Math.random().toString(20).slice(2)
  return `${random()}_${random()}`
}
