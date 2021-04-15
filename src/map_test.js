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
import Grid from '@material-ui/core/Grid';
// import { Nav, Navbar} from 'react-bootstrap';
import Navbar from './components/Navbar.js';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, Explore, Info } from '@material-ui/icons';
import { Provider } from 'react-redux';
import { hashHistory, Router, Route } from 'react-router';

// Kepler.gl actions
import { addDataToMap } from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
// import Button from './button';
import Footer from './footer';
import downloadJsonFile from "./file-download";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class Map extends Component {

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
    const window_height = window.innerHeight;
    const navStyle = {
      align: 'center'
    };
    const mapStyle = {
      position: 'fixed',
      width: '50%',
      height: '50%',
      // marginTop: quarter_height - 60,
      marginTop: window_height / 2 + 100,
      overflow: 'scroll'
      // marginLeft: quarter_width
    };
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div style={{ marginTop: 30, overflow: scroll }}>
          <BottomNavigation
            value="hello"
            onChange={(event, newValue) => {
              console.log(newValue);
              if (newValue == 1) {
                this.props.router.push('/map');
              }
              else if (newValue == 2) {
                this.props.router.push('/about');
              }
            }}
            showLabels
          // className={classes.root}
          >
            <BottomNavigationAction label="Home" icon={<Home />} />
            <BottomNavigationAction label="Map" icon={<Explore />} />
            <BottomNavigationAction label="About" icon={<Info />} />
          </BottomNavigation>
        </div>
        <div style={mapStyle}>
          {/* <Button onClick={this.exportMapConfig}>Export Config</Button> */}
          {/* <div style={{justify: "center", alignItems: "center"}}> */}
          <div>
            {/* <Form width={quarter_width} height={quarter_height}></Form> */}
            <Button variant="outlined" color="primary" style={{ margin: 30 }} onClick={() => this.replaceData(LiData)}>
              Get Li Data
            </Button>
            <Button variant="outlined" color="primary" style={{ margin: 30 }} onClick={() => this.replaceData(WangData)}>
              Get Wang Data
            </Button>
            <Button variant="outlined" color="primary" style={{ margin: 30 }} onClick={() => this.replaceData(ZhangData)}>
              Get Zhang Data
            </Button>
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
      </Grid>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Map);
