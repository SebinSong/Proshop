class CustomHookError extends Error {
  constructor (msg = '') {
    super(msg);

    this.name = 'CustomHookError'
    this.date = new Date()
  }
}

export default CustomHookError;