import React from 'react'
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api'
import { FaSpinner } from "react-icons/fa"
import geoData from "../geo_data/demo.json"

const mapContainerStyle = {
  height: "500px",
  width: "100%",
  margin: "auto"
};

const mapOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false
}

const bluePolyOptions = {
  fillColor: "blue",
  fillOpacity: 0.5,
  strokeColor: "blue",
  strokeOpacity: 0.4,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

const redPolyOptions = {
  fillColor: "red",
  fillOpacity: 0.5,
  strokeColor: "red",
  strokeOpacity: 0.4,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

const redPolyPaths = geoData.polygons[0].coordinates
const bluePolyPaths = geoData.polygons[1].coordinates

function DemoServiceAreas() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBArCe4tf_Yk2PZO_QKvC4rJKw5blULfNQ",
    libraries: ["places"]
  })
  const renderMap = () => {
    return (
      < >
        <div className="hero is-primary" style={{ paddingTop: "3em", paddingBottom: "1.75em" }}>
          <div className="hero-body">
            <div className="container ">
              <h1 className="title is-spaced has-text-centered">Pinpoint Service Areas</h1>
              <h2 className="subtitle">
                For the purpose of this demonstration, a KML file has been created that contains <span style={{ textDecoration: "underline" }}>two</span> Polygons in
                southeast of Lincoln, each signifying an area of service.
            </h2>
            </div>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
          center={{ lat: 40.755, lng: -96.635 }}
          zoom={12}
        >
          <Polygon
            paths={redPolyPaths}
            options={redPolyOptions}
          />
          <Polygon
            paths={bluePolyPaths}
            options={bluePolyOptions}
          />
        </GoogleMap>
        <div className="section">
          <div className="container" style={{paddingTop: "4rem", paddingBottom: "4rem"}}>
            <div className="columns is-vcentered">
              <div className="column is-5">
                <span className="title is-4">Services</span>
                <p className="is-size-5">
                  Assuming Pinpoint offers different services in different geographic areas, above areas have been assigned different service availabilities.
                  Purple Area is not a seperate zone but merely an intersection of Red and Blue. Thus, addresses that fall within that section have both Red and Blue
                  Area services available to them.
                </p>
              </div>
              <div className="column is-1"></div>
              <div className="column is-6">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Area</th>
                      <th>Service Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Red Area</td>
                      <td>DSL Service</td>
                    </tr>
                    <tr>
                      <td>Blue Area</td>
                      <td>Fiber to the Home Service</td>
                    </tr>
                    <tr>
                      <td>Purple Area</td>
                      <td>Both DSL and Fiber to the Home Service</td>
                    </tr>
                    <tr>
                      <td><i>Anywhere Else</i></td>
                      <td><i>No Service Available</i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (isLoaded)
    return renderMap()
  else if (loadError)
    return <div>Map cannot be loaded right now, sorry.</div>
  else
    return <FaSpinner />
}

export default DemoServiceAreas