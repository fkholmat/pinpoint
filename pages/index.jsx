import React from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Head from "next/head";
import { classnames } from "../helpers";
import { FaSearchLocation, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { IconContext } from "react-icons";

// import geoData from "../geo_data/Pinpoint.json";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error);
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status);
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

    // let features = []
    // features = geoData.features
    // console.log(geoData.features.length)

    const addressInput = () => {
      let locationIcon = document.querySelectorAll(".location-icon")
      locationIcon[0].classList.toggle("focused");
    }

    return (
      <>
        <Head>
          <title>Pinpoint</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBArCe4tf_Yk2PZO_QKvC4rJKw5blULfNQ&libraries=places"></script>
        </Head>
        <div className="hero is-medium is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Service Availability</h1>
              <h2 className="subtitle">
                Please enter your address below to see what Pinpoint services are available to you.
              </h2>
              <PlacesAutocomplete
                onChange={this.handleChange}
                value={address}
                onSelect={this.handleSelect}
                onError={this.handleError}
                shouldFetchSuggestions={address.length > 2}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                  return (
                    <div className="dropdown is-active address-search" style={{ display: "block", margin: "auto" }}>
                      <div className="dropdown-trigger">
                        <div className="field">
                          <div className="control has-icons-left">
                            <input
                              {...getInputProps({
                                className: "input address-input",
                                type: "search",
                                placeholder: "Enter Your Address...",
                                autoFocus: true
                              })}
                              onFocus={addressInput}
                              onBlur={addressInput}
                            />
                            <span className="icon is-left">
                              <IconContext.Provider value={{ size: "1.25em", className: "location-icon" }}>
                                <FaSearchLocation />
                              </IconContext.Provider>
                            </span>
                          </div>
                        </div>
                      </div>
                      {suggestions.length > 0 && (
                        <div className="dropdown-menu" role="menu" style={{ width: "100%" }}>
                          <div className="dropdown-content" style={{ textAlign: "left" }}>
                            {suggestions.map(suggestion => {
                              const className = classnames('dropdown-item address-suggestion', {
                                'address-suggestion-focus': suggestion.active,
                              });
                              return (
                                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { className })} >
                                  <span className="icon" style={{ width: "2.5rem" }}>
                                    <IconContext.Provider value={{ size: "1.25em" }}>
                                      <FaMapMarkerAlt />
                                    </IconContext.Provider>
                                  </span>
                                  <strong>
                                    {suggestion.formattedSuggestion.mainText}
                                  </strong>{' '}
                                  <small>
                                    {suggestion.formattedSuggestion.secondaryText}
                                  </small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              </PlacesAutocomplete>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            {errorMessage.length > 0 && (
              <div>{this.state.errorMessage}</div>
            )}
            {((latitude && longitude) || isGeocoding) && (
              <div>
                <h3 className="title">Geocode Result</h3>
                {isGeocoding ? (
                  <div>
                    <IconContext.Provider value={{ size: "3em", color: "#111D5E" }}>
                      <FaSpinner />
                    </IconContext.Provider>
                  </div>
                ) : (
                    <div>
                      <div>
                        <label>Latitude: </label>
                        <span>{latitude}</span>
                      </div>
                      <div>
                        <label>Longitude: </label>
                        <span>{longitude}</span>
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
