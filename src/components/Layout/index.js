import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Container, Main } from './styles'

export default (props) => (
  <Container>
    <Header />
    <Main>
      {props.children}
    </Main>
    <Footer />
  </Container>
)