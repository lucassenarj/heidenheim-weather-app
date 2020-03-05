import React, { Component } from 'react'
import Layout from './../../components/Layout'
import { getWeatherInfo } from './../../services/api'
import Card from './../../components/Card'

class HoemPage extends Component {
  state = {
    loading: false,
    info: null
  }
  componentDidMount = async () => {
    this.setState({ loading: true })
    const result = await getWeatherInfo()
    if(result.status) {
      this.setState({ info: result.response, loading: false })
      return
    }
    this.setState({ loading: false })
  }

  render = () => {
    return (
      <Layout>
        <section>
          <div className="container">
            {!this.state.loading && (
              <div className="columns is-desktop">
                <div className="column is-one-third">
                  <Card weather={this.state.info} />
                </div>
                <div className="column is-two-thirds">
                  <Card />
                  <Card />
                </div>
              </div>
            ) }
          </div>
        </section>
      </Layout>

    )
  }
}

export default HoemPage