import {useState} from 'react';
import tw, {css, styled} from 'twin.macro';
import {FaRoute} from 'react-icons/fa';
import {BaseContainer as Container} from '../BaseStyle';
import {Button, Heading} from '../Elements';
import Map from '../Map';
import useIsMobile from '../../hooks/useIsMobile';
import {BUSINESS_LOCATION} from '../../static/js/constants';

const Location = () => {
  const [userLocation, setUserLocation] = useState(null)
  const [positionActive, setPositionActive] = useState(false)
  const IS_MOBILE = useIsMobile()

  const getUserLocation = () => {
    if (navigator.geolocation) {
      !positionActive && (navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(pos);

          return;
        },
        () => {
          handleLocationError(true);
        }
      ));
      setPositionActive(!positionActive);
      setUserLocation(null);
    } else {
      handleLocationError(false);
    }
  }

  const handleLocationError = (browserHasGeolocation) => {
    return browserHasGeolocation ? 'Error: the location service failed' : "Error: your browser doesn't support geolocation"
  }

  return (
    <Container tw='text-center'>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>
      <Map userLocation={userLocation} />
      {IS_MOBILE ? (
        <Button type='text' cta target='_blank' href={`https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`}>Instrucciones</Button>
      ) : (
        <>
          <Button type='icon' onClick={getUserLocation}><FaRoute /></Button>
        </>
      )}
    </Container>
  )
}

export default Location
