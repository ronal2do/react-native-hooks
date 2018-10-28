import React, { useEffect, useState } from 'react'

export default (positionOptions = {}) => {  
  const [position, setPosition] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null
  })
  const [isInitialized, initialize] = useState(false)

  success = (data) => {
    setPosition(data.coords)
  }

  failure = (err) => {
    console.log('error setting coordinates: ', err)
  }

  useEffect(() => {
    if (!isInitialized) {
      navigator.geolocation.getCurrentPosition(success, failure)
      initialize(true)
    }
  })

  useEffect(() => {
    const listener = navigator.geolocation.watchPosition(
      success,
      failure,
      positionOptions
    )

    return () => navigator.geolocation.clearWatch(listener);
  })

  return position;
};