import {useRef} from 'react';
import {useSpring, config} from 'react-spring';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

import {MdClose} from 'react-icons/md';
import {RiFullscreenExitFill, RiFullscreenFill} from 'react-icons/ri';

import {BUSINESS_LOCATION, LIBRARIES} from '../../static/ts/constants';
import {useMapContext} from '../../context/MapProvider';
import DetailsGetter from './helpers';

import Loading from './Loading';
import MarkerContainer from './MarkerContainer';
import Route from './Route';
import PlaceDetails from './PlaceDetails';
import ResizeStreetView from './ResizeStreetView';
import {Container, HideBttn, GoogleMapContainer, FullscreenBttn} from './styledComponents';

const Map = ():JSX.Element => {
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES,
  })

  const {map, dispatchMap} = useMapContext()
  const mapContainerRef = useRef()

  const mapSpring = useSpring({
    to: {
      left: map.open ? '35%' : '0%',
      width: map.open ? '65%' : '100%',
      overflow: 'hidden',
    },
    config: config.default
  })
  const hideBttnSpring = useSpring({
    to: {
      left: map.open ? '30%' : '-5%',
      opacity: map.open ? '1' : '0',
    },
    config: config.default
  })

  const business: google.maps.LatLngLiteral = {lat: -12.123305609301212, lng: -77.0401126174581};

  const renderMap = () => {
    return (
      <Container mapFullscreen={map.fullscreen}>
        <PlaceDetails />

        <HideBttn type='icon' style={hideBttnSpring}
          onClick={() => dispatchMap({type: 'HIDE'})}>
          <MdClose />
        </HideBttn>

        <GoogleMapContainer style={mapSpring} ref={mapContainerRef}>
          <GoogleMap
            zoom={16}
            center={BUSINESS_LOCATION}
            clickableIcons={false}
            options={{
              fullscreenControl: false,
            }}
            mapContainerStyle={{
              height: '100%',
              width: '100%',
            }}
          >
            <ResizeStreetView />
            <MarkerContainer />
            <Route />
            <DetailsGetter />
          </GoogleMap>

          <FullscreenBttn
            onClick={() => dispatchMap({type: 'MAP_FULLSCREEN'})}
          >
            {map.fullscreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
          </FullscreenBttn>
        </GoogleMapContainer>
      </Container >
    )
  }

  if (loadError) {
    return <p>Map cannot be loaded</p>
  }

  return (
    // cause useJsApiLoader is async
    isLoaded ? renderMap() : <Loading />
  )
}

export default Map
