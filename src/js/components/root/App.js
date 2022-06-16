import React from 'react'

// children components
import AppStyles from '../app-styles/AppStyles.js'
import Footer from '@components/footer'
import Header from '@components/header'

const { Container } = React.Global

function App (props) {
  return (
    <>
      <AppStyles />
      <div className="app-container app-layout">
        <Header />
        <main className="l-page">
          <Container classes="p-content">
            Hello World
          </Container>

          <Footer />
        </main>

      </div>
    </>
  )
}

export default App