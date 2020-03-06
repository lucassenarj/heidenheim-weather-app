import React, { Component, Fragment } from 'react'
import MapGL, { Marker } from 'react-map-gl'
import Dimensions from 'react-dimensions'
import PropTypes from 'prop-types'
import { Container } from './styles'

class MapWrapper extends Component {
  API_TOKEN = 'pk.eyJ1IjoibHVjYXNzZW5hcmoiLCJhIjoiY2szYWZzdWg4MGJ0eTNicWgxa2pibzF5cSJ9.9CYaS2GvgVKB_uC1wQhFOw';

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  }

  state = {
    viewport: {
      latitude: 48.6742746129279,
      longitude: 10.173079459233461,
      zoom: 10.424041270260442,
      bearing: 0,
      pitch: 0
    }
  }

  render() {
    const { containerWidth: width, containerHeight: height } = this.props;
    const { viewport } = this.state;
    console.log(width)
    console.log(height)

    return (
      <Fragment>
        <MapGL 
          width={width} 
          height={height} 
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={this.API_TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <Marker longitude={viewport.longitude} latitude={viewport.latitude} />
        </MapGL>
        {this.props.children}
      </Fragment>
    );
  }
}

const Wrapper = Dimensions()(MapWrapper)

const Map = () => (
  <Container>
    <Wrapper />
  </Container>
)

export default Map;