// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import WangData from './data/WANG_dated.csv.js';
import ZhangData from './data/ZHANG_dated.csv.js';
import LiData from './data/LI_dated.csv.js';
import currConfig from './data/config.json';
import Form from './components/Form.js'
// import { Nav, Navbar} from 'react-bootstrap';
import Navbar from './components/Navbar.js';

// Kepler.gl actions
import { addDataToMap } from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
import Button from './button';
import Footer from './footer';
import downloadJsonFile from "./file-download";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {

  componentDidMount() {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(WangData);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        // `info` property are optional, adding an `id` associate with this dataset makes it easier
        // to replace it later
        id: 'my_data'
      }
    };
    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({
      datasets: dataset, config: currConfig, options: {
        centerMap: true,
        readOnly: true,
        keepExistingConfig: false
      }
    }));
  }

  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  getMapConfig() {
    // retrieve kepler.gl store
    const { keplerGl } = this.props;
    // retrieve current kepler.gl instance store
    const { map } = keplerGl;

    // create the config object
    return KeplerGlSchema.getConfigToSave(map);
  }

  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  exportMapConfig = () => {
    // create the config object
    const mapConfig = this.getMapConfig();
    // save it as a json file
    downloadJsonFile(mapConfig, 'kepler.gl.json');
  };

  // Created to show how to replace dataset with new data and keeping the same configuration
  replaceData = new_file_name => {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(new_file_name);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        id: 'my_data'
        // It is paramount that this id mathces your configuration otherwise the configuration file will be ignored.
      }
    };

    // read the current configuration
    const config = this.getMapConfig();

    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({ datasets: dataset, config }));
  };


  render() {
    const quarter_width = window.innerWidth / 4;
    const quarter_height = window.innerHeight / 4;
    const mapStyle = {
      position: 'fixed',
      width: '50%',
      height: '50%', 
      marginTop: quarter_height - 60, 
      marginLeft: quarter_width
    };
    return (
      <div style={{ display: 'flex' }}>
        <Navbar></Navbar>
        {/* <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form>
  </Navbar> */}
        <div style={mapStyle}>
          {/* <Button onClick={this.exportMapConfig}>Export Config</Button> */}

          <div style={{ marginLeft: quarter_width / 2 - 60 }}>
            <Form width={quarter_width} height={quarter_height}></Form>
            <Button onClick={() => this.replaceData(LiData)}>Get Li Data</Button>
            <Button onClick={() => this.replaceData(WangData)}>Get Wang Data</Button>
            <Button onClick={() => this.replaceData(ZhangData)}>Get Zhang Data</Button>
          </div>


          <AutoSizer>
            {({ height, width }) => (
              <KeplerGl
                mapboxApiAccessToken={MAPBOX_TOKEN}
                id="map"
                width={width}
                height={height}
                appName="HELLO"
              />
            )}
          </AutoSizer>
        </div>
        {/* <Footer></Footer> */}
        {/* <Button style={{marginTop: 500}} onClick={() => this.replaceData(LiData)}>Li Data</Button> */}
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
