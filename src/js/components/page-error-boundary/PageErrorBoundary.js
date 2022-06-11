import React from 'react'

class PageErrorBoundary extends React.Component {
  // reference: https://reactjs.org/docs/error-boundaries.html
  constructor (props) {
    super(props)

    this.state = { isError: false }
  }

  static getDerivedStateFromError(error) {
    return { isError: true }
  }

  componentDidCatch (error, errorInfo) {
    console.error('error thrown: ', error)
  }

  render () {
    if (!this.state.isError)
      return this.props.children

    return (
      <main>404 not found</main>
    )
  }
}

export default PageErrorBoundary