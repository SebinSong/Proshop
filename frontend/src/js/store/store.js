import * as toolkit from '@reduxjs/toolkit'

console.log('all: ', toolkit)
const store = toolkit.configureStore({
  reducer: {}
})

export default store