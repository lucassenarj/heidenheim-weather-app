import React, { Component } from 'react'
import Layout from './../../components/Layout'
import { getWeatherInfo } from './../../services/api'

class HoemPage extends Component {
  state = {
    loading: false,
    info: null
  }
  componentDidMount = async () => {
    const result = await getWeatherInfo()
    console.log(result)
    this.setState({ info: result })
  }

  render = () => {
    return (
      <Layout>
        <h1>Home Page</h1>
      </Layout>

    )
  }
}

export default HoemPage