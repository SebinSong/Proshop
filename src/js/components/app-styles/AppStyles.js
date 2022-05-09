import React from 'react'
import ColorSets from './colors'

const defaultTheme = 'light'
const defaultColorSet = ColorSets[defaultTheme].colors || {}

function AppStyles () {
  const variableDeclarations = Object.entries(defaultColorSet)
    .map(([varname, value]) => `  --${varname}: ${value};\r\n`)
    .join('')
  
  return (
    <style>
      { ':root \{\r\n' + variableDeclarations + '\}' }
    </style>
  )
}

export default AppStyles