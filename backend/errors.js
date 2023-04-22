'use strict'

export class DataBaseStartupError extends Error {
  constructor (...params) {
    super(...params)

    this.name = 'DatabaseStartupError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
