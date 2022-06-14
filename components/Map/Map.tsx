import {useSpring, config} from 'react-spring';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

import {MdClose} from 'react-icons/md';
import {RiFullscreenExitFill, RiFullscreenFill} from 'react-icons/ri';

import {BUSINESS_LOCATION, LIBRARIES} from '../../static/js/constants';
import {useMapContext} from '../../context/MapProvider';
import DetailsGetter from './helpers';

import Loading from './Loading';
import MarkerContainer from './MarkerContainer';
import Route from './Route';
import PlaceDetails from './PlaceDetails';
import {Container, HideBttn, GoogleMapContainer, FullscreenBttn} from './styledComponents';


const Map = () => {
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  })
  const {map, dispatchMap} = useMapContext()

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

  const renderMap = () => {
    return (
      <Container mapFullscreen={map.fullscreen}>
        <PlaceDetails />

        <HideBttn type='icon' style={hideBttnSpring}
          onClick={() => dispatchMap({type: 'HIDE'})}>
          <MdClose />
        </HideBttn>

        <GoogleMapContainer style={mapSpring}>
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