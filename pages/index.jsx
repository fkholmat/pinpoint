import React from "react";
// import Head from "next/head";

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

class HomePage extends React.Component {
  render() {
    // const MyMapComponent = withScriptjs(
    //   withGoogleMap((props) => (
    //     <GoogleMap
    //       defaultZoom={8}
    //       defaultCenter={{ lat: 40.2820, lng: -100.1657 }}
    //     >
    //       {props.isMarkerShown && (
    //         <Marker position={{ lat: 40.2820, lng: -100.1657 }} />
    //       )}
    //     </GoogleMap>
    //   ))
    // );

    return (
      <>
        {/* <Head>

        </Head> */}
        <div className="hero is-medium is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-size-3">Service Availability</h1>
              <h2 className="subtitle is-size-5">
                Please enter your address below to discover if service is
                available in your area.
              </h2>
              <div className="field has-addons" style={{justifyContent: "center"}}>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    size="50"
                    placeholder="Enter Your Street Address"
                  />
                </div>
                <div className="control">
                  <a className="button is-link">Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          {/* <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> */}
        </div>
      </>
    );
  }
}

export default HomePage;
