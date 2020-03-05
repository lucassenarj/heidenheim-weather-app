import React, { Component } from 'react'
import { Temperature } from './styles'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import 'moment'
import moment from 'moment';

class Card extends Component {
  state = {
    loading: true,
    weather: {
      daily: {
        data: []
      }
    },
    marks: {},
    marksDetails: [],
    markSelected: {}
  }

  componentDidMount = async () => {
    if(this.props.weather) {
      await this.setState({ loading: false, weather: this.props.weather })
      this.handleMarks()
    }
  }
  
  handleMarks = () => {
    let daysMarks = []
    let marksDetails = []
    const markArray = this.state.weather.daily.data
    markArray.forEach((item, index) => {
      if(index <= 5) {
        const id = index*20
        const label = moment(item.time * 1000).format('dddd').substring(0, 3).toUpperCase()
        daysMarks[id] = label
        marksDetails.push({ 
          id, 
          minTemp: item.temperatureMin,
          minTempTime: item.temperatureMinTime,
          maxTemp: item.temperatureMax,
          maxTempTime: item.temperatureMaxTime,
          sunrise: item.sunriseTime,
          sunset: item.sunsetTime
        })
      }
    });
    if(markArray.length >= 1) {
      this.setState({ marks: Object.assign({}, daysMarks), marksDetails, markSelected: marksDetails[0] })
    }
  }
  
  handleSlideChange = async value => {
    const selectedArray = await this.state.marksDetails
    const selectedItem = selectedArray.find(item => {
      return item.id === value
    })

    this.setState({ markSelected: selectedItem })
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p className="card-header-title">San Francisco</p>
            <time dateTime="2016-1-1">Mon, 12:30 PM, Mostly sunny</time>
          </div>
        </div>
        <div className="card-content">
          <div className="columns is-mobile">
            <div className="column is-two-fifths">
              <Temperature>
                23&deg;C
              </Temperature>
            </div>
            <div className="column">
              <img src="https://cdn.vuetifyjs.com/images/cards/sun.png" alt="Sunny" />
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <figure className="image is-24x24">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
              </figure>
            </div>
            <div className="media-content">
              <p className="subtitle is-6">@johnsmith</p>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <figure className="image is-24x24">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
              </figure>
            </div>
            <div className="media-content">
              <p className="subtitle is-6">@johnsmith</p>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column">
              <Slider min={0} marks={this.state.marks} step={20} onChange={this.handleSlideChange} included={false} defaultValue={0} />
            </div>
          </div>
          {this.state.markSelected && 
            <p>{this.state.markSelected.minTemp}</p>
          }
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">
            <span>
              View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
            </span>
          </p>
          <p className="card-footer-item">
            <span>
              Share on <a href="sasa">Facebook</a>
            </span>
          </p>
        </footer>
      </div>
    )
  }
}

export default Card