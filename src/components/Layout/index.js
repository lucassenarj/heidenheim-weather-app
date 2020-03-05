import React, { Fragment } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

export default (props) => (
  <Fragment>
    <Header />
    <main>
      {props.children}
    </main>
    <Footer />
  </Fragment>
)