// This function generates a unique id for new note posts. It is an alternative to the uuid npm package installed. To use, include with other imports at the top of the .js file using the syntax below. Note: you can use any valid name in place of 'uid' and also the path may differ depending on where you are importing.

// →  import uid from '../uniqueId.js'

export default () => {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}