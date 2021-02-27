import React from "react";
import Head from "next/head";
import ServiceAreas from "../components/DemoServiceAreas"
import ServiceCheck from "../components/DemoServiceCheck"

class HomePage extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Pinpoint</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <ServiceAreas />
        <ServiceCheck />
      </>
    );
  }
}

export default HomePage;
