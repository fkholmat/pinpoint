import React, { useState } from 'react'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import { FaSearchLocation, FaSpinner } from "react-icons/fa"
import { IconContext } from "react-icons"
import geoData from "../geo_data/demo.json"
import isPointInPolygon from 'geolib/es/isPointInPolygon';

function DemoServiceCheck() {
  const [address, setAddress] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBArCe4tf_Yk2PZO_QKvC4rJKw5blULfNQ",
    libraries: ["places"]
  })

  const onLoad = (autocompleteAddress) => {
    setAddress(autocompleteAddress)
  }

  const onPlaceChanged = () => {
    if (address !== null) {
      let addressCoordinates = {
        lng: address.getPlace().geometry.location.lng(),
        lat: address.getPlace().geometry.location.lat()
      }
      let serviceAreas = geoData.polygons.filter(polygon => isPointInPolygon(addressCoordinates, polygon.coordinates))
      console.log(serviceAreas)
      setAvailableServices(serviceAreas)
      toggleModal()
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  const addressInput = () => {
    let locationIcon = document.querySelectorAll(".location-icon")
    locationIcon[0].classList.toggle("focused");
  }

  const toggleModal = () => {
    document.getElementById("modal").classList.toggle("is-active")
    document.getElementById("addressField").value = ""
    document.getElementById("addressField").focus()
  }

  const searchResult = () => {
    if (availableServices.length > 0) {
      return (
        <div>
          <p>Good news, Pinpoint provides services in your area.</p>
          <p className="" style={{paddingTop: "1.5rem"}}><strong>Available Services</strong></p>
          {availableServices.map(area => {
            return(
              <p>{area.name} - {area.services}</p>
            )
          })}
        </div>
      )
    }
    else {
      return (
        <p>Unfortunately <strong>no</strong> Pinpoint services are available at your location.</p>
      )
    }
  }

  const renderAutocomplete = () => {
    return (
      <div className="hero is-primary" style={{ paddingTop: "3em", paddingBottom: "1.75em" }}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-spaced">Pinpoint Service Availability</h1>
            <h2 className="subtitle">
              Please enter your address below to see what Pinpoint services are available to you.
            </h2>
            <div className="dropdown is-active address-search" style={{ display: "block", margin: "auto", paddingBottom: "2.5rem" }}>
              <div className="dropdown-trigger">
                <div className="field">
                  <div className="control has-icons-left">
                    <Autocomplete
                      restrictions={{ country: ["us"] }}
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      < >
                        <input
                          id="addressField"
                          className="input"
                          type="search"
                          placeholder="Enter Your Address..."
                          onFocus={addressInput}
                          onBlur={addressInput}
                        />
                        <span className="icon is-left">
                          <IconContext.Provider value={{ size: "1.25em", className: "location-icon" }}>
                            <FaSearchLocation />
                          </IconContext.Provider>
                        </span>
                      </>
                    </Autocomplete>
                  </div>
                </div>
              </div>
            </div>
            <div className="has-text-left" style={{ paddingTop: "2.5em" }}>
              <span className="title is-spaced is-4">Autocomplete Feature</span>
              <p className="subtitle is-5">
                When a user starts typing an address, it's being queried using Google's Places API.
                For the sake of speed and convinience it's only quering US addresses and only five most likely address
                are shown at a time (starting from the closest). Once address is selected, its geo location is fetched.
              </p>
              <span className="title is-spaced is-4">Service Availability Check</span>
              <p className="subtitle is-5">
                Upon getting address geocode it's checked to see if it falls within any of our Polygons (service areas). In this case, we have only two areas to check.
                During the check all service areas that contain the given address is returned. That way we get all available services for that address. If no service area is returned, Pinpoint
                provides no service at that address.
              </p>
              <span className="title is-spaced is-4">Testing</span>
              <p className="subtitle is-5">
                For testing purposes use the map provided above. Zoom in closer untill you can see different businesses within our service areas, you can click on them to see their address.
                Using their address and knowing in what area they are in, test service availability. Check for addresses in red, blue and purple areas. And of course for addresses outside any of these zones.
              </p>
            </div>

            <div id="modal" className="modal">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Available Services</p>
                  <button className="delete" aria-label="close" onClick={toggleModal} />
                </header>
                <section className="modal-card-body has-text-black">
                  {searchResult()}
                  <button className="button is-link" style={{ marginTop: "2.5rem", float: "right" }} onClick={toggleModal}>OK</button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoaded)
    return renderAutocomplete()
  else if (loadError)
    return <div>Address service check is not available right now, sorry.</div>
  else
    return <FaSpinner />
}

export default React.memo(DemoServiceCheck)
