'use strict'

export const MINS_MILLIS = 60 * 1000
export const HOURS_MILLIS = 60 * MINS_MILLIS
export const DAYS_MILLIS = 24 * HOURS_MILLIS
export const MONTHS_MILLIS = 30 * DAYS_MILLIS

export const PRODUCT_CHECKOUT_STEPS = [
  { order: 1, name: 'Sign in' },
  { order: 2, name: 'Shipping', linkTo: '/shipping' },
  { order: 3, name: 'Payment', linkTo: '/payment' },
  { order: 4, name: 'Place order', linkTo: '/place-order' }
]

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

export function removeFromLocalStorage (key) {
  if (localStorage.getItem(key)) {
    return localStorage.removeItem(key)
  }
}

export function validateEmail (str) {
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return emailRegExp.test(str)
}

export function classNames (...args) {
  // simplified version of 'classnames' npm package (https://www.npmjs.com/package/classnames) 
  const isObjectLiteral = (val) => {
    return typeof val === 'object' && val !== null && val.constructor === Object
  }

  return args.filter(Boolean)
    .map(arg => {
      if (typeof arg === 'string') { return arg }
      else if (isObjectLiteral(arg)) {
        const validKeyArr = []

        for (const [key, val] of Object.entries(arg)) {
          if (val) { validKeyArr.push(key) }
        }
        return validKeyArr.join(' ')
      }
    }).join(' ')
}

export function ifElseComponent (...entryList) {
  for (const entry of entryList) {
    if (Array.isArray(entry)) {
      if (Boolean(entry[0])) { return entry[1] }
    } else {
      if (entry) { return entry }
    }
  }

  return null
}

export function combineShippingAddress (obj) {
  // This util function ensures the address displayed in the order that makes sense
  const { address = '', city = '', postalCode = '', country = '' } = obj

  return [ address, city, postalCode, country ].filter(Boolean).join(', ')
}

export function copyTextToClipboard (str) {
  return navigator.clipboard.writeText(str)
}

export function humanDate (date, options = {
  month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
}) {
  const locale = typeof navigator === 'undefined'
    ? 'en-US'
    : navigator.languages || navigator.language

  return new Date(date).toLocaleString(locale, options)
}

export function isStringNumberOnly (val) {
  return /^\d*\.?\d*$/.test(val)
}
