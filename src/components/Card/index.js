import React, { Component } from 'react'
import { Temperature } from './styles'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import ReactAnimatedWeather from 'react-animated-weather'

class Card extends Component {

  static propTypes = {
    weather: PropTypes.shape({
      currently: PropTypes.shape({
        time: PropTypes.number,
        temperature: PropTypes.number,
        icon: PropTypes.string
      }).isRequired,
      daily: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            temperatureMin: PropTypes.number,
            temperatureMinTime: PropTypes.number,
            temperatureMax: PropTypes.number,
            temperatureMaxTime: PropTypes.number,
            sunriseTime: PropTypes.number,
            sunsetTime: PropTypes.number
          })
        ).isRequired
      }).isRequired
    })
  }

  state = {
    loading: true,
    weather: {
      currently: {
        time: '',
        temperature: 0,
        icon: 'WIND'
      },
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
        const label = this._formatDate(item.time, 'dddd').substring(0, 3).toUpperCase()
        daysMarks[id] = label
        marksDetails.push({ 
          id, 
          minTemp: this._fahrenheitToCelcius(item.temperatureMin),
          minTempTime: this._formatDate(item.temperatureMinTime, 'LT'),
          maxTemp: this._fahrenheitToCelcius(item.temperatureMax),
          maxTempTime: this._formatDate(item.temperatureMaxTime, 'LT'),
          sunrise: this._formatDate(item.sunriseTime, 'LT'),
          sunset: this._formatDate(item.sunsetTime, 'LT')
        })
      }
    });
    if(markArray.length >= 1) {
      this.setState({ marks: Object.assign({}, daysMarks), marksDetails, markSelected: marksDetails[0] })
    }
  }

  _fahrenheitToCelcius = temp => {
    return `${((temp - 32) * 5 / 9).toFixed(0)}°C`
  }

  _formatDate = (date, format = 'llll') => {
    return moment(date * 1000).tz('Europe/Berlin').format(format)
  }

  _milesToKilometer = speed => {
    return `${(speed/0.62137).toFixed(2)} km/h`
  }
  
  handleSlideChange = async value => {
    const selectedArray = await this.state.marksDetails
    const selectedItem = selectedArray.find(item => {
      return item.id === value
    })

    this.setState({ markSelected: selectedItem })
  }

  renderDetails() {
    const { markSelected } = this.state
    return (
      <div className="columns is-mobile has-text-centered">
        <div className="column">
          <p><i className="fa fa-temperature-low fa-lg"></i> {markSelected.minTemp}</p>
          <h6>{markSelected.minTempTime}</h6>
        </div>
        <div className="column">
          <p><i className="fa fa-temperature-high fa-lg"></i> {markSelected.maxTemp}</p>
          <h6>{markSelected.maxTempTime}</h6>
        </div>
        <div className="column">
          <p><i className="fa fa-sun fa-lg" /></p>
          <h6>{markSelected.sunrise}</h6>
        </div>
        <div className="column">
          <p><i className="fa fa-moon fa-lg" /></p>
          <h6>{markSelected.sunset}</h6>
        </div>
      </div>
    )
  }

  render() {
    const { currently } = this.state.weather
    const time = this._formatDate(currently.time)
    const temperature = this._fahrenheitToCelcius(currently.temperature)
    const windSpeed = this._milesToKilometer(currently.windSpeed)
    const precipProbability = (currently.precipProbability * 100).toFixed(0)
    const icon = `${currently.icon}`
    const place = 'Heidenheim, Germany'
    const defaults = {
      icon: icon.toUpperCase(),
      color: 'goldenrod',
      size: 64,
      animate: true
    }
    return (
      <div className="card">
        <div className="card-content">
          <p className="title">
            {place}
          </p>
          <p className="subtitle">
            <time dateTime={time}>{time}</time>
          </p>
          <div className="columns is-mobile">
            <div className="column is-one-third">
              <Temperature>
                {temperature}
              </Temperature>
            </div>
            <div className="column">
              <ReactAnimatedWeather
                icon={defaults.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column">
              <div className="media">
                <div className="media-left">
                  <ReactAnimatedWeather
                    icon='WIND'
                    color='grey'
                    size={32}
                    animate={defaults.animate}
                  />
                </div>
                <div className="media-content">
                  <p className="subtitle is-4">{windSpeed}</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="media">
                <div className="media-left">
                  <ReactAnimatedWeather
                    icon='RAIN'
                    color='grey'
                    size={32}
                    animate={defaults.animate}
                  />
                </div>
                <div className="media-content">
                  <p className="subtitle is-4">{`${precipProbability}%`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column">
              <Slider min={0} marks={this.state.marks} step={20} onChange={this.handleSlideChange} included={false} defaultValue={0} />
            </div>
          </div>
          {this.state.markSelected && this.renderDetails()}
        </div>
      </div>
    )
  }
}

export default Card