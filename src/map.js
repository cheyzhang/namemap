// Copyright (c) 2018 Uber Technologies, Inc.
// Modified by Cheyenne Zhang
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
import * as ALL_DATA from './data';
import SurnameDict from './data/surnames.json';
import Grid from '@material-ui/core/Grid';
import currConfig from './data/config.json';
// import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, Explore, Info } from '@material-ui/icons';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Kepler.gl actions
import { addDataToMap } from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
import downloadJsonFile from "./file-download";

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { curr: undefined };
    this.title = "";
    this.text1 = "Choose a last name from the dropdown above to get started. The listed names are the 150 most frequent surnames in the database's sources, ordered from most to least frequent.";
    this.text2 = "";
    this.text3 = "";
    this.mapStyle = {
      position: 'fixed',
      width: '50%',
      height: '50%',
      marginTop: window.innerHeight / 2 + 100
    };
    this.parseData();
  }

  parseData() {
    let output_dict = {};
    let labels = [];
    for (let curr in SurnameDict) {
      const key = curr;
      const val = SurnameDict[curr];
      const chi = val[0];
      const py = val[1];
      const label = chi + "/" + py;
      output_dict[label] = key;
      labels.push(label);
    }
    this.labels = labels;
    this.dict = output_dict;
  }

  componentDidMount() {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(ALL_DATA.WangData);
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
    const cardStyle = {
      maxWidth: 500,
      marginTop: 30,
      paddingLeft: 30,
      paddingRight: 30
    };
    const formStyle = {
      minWidth: 150
    };

    const handleSelect = (event) => {
      const label = event.target.value
      const key = this.dict[label];
      const stats_name = "ALL_DATA." + key + "Stats";
      const data_name = "ALL_DATA." + key + "Data";
      const data = eval(data_name);
      const stats = eval(stats_name);
      this.replaceData(data);
      this.state.curr = key;
      this.mapStyle = {
        position: 'fixed',
        width: '50%',
        height: '50%',
        marginTop: window.innerHeight / 2 + 100,
        marginBottom: 30
      };
      let stats_split = stats.split(",");

      this.title = "Selected Surname: " + label;
      this.text1 = "We found " + stats_split[0] + " individuals with the last name " + label + ". ";
      this.text2 = stats_split[1] + " were male, and " + stats_split[2] + " were female.";
      this.text3 = "At the time, women were only put on record with relation to men. As such, " + stats_split[3] + " of these women actually had this last name, and " + stats_split[4] + " were married to men of this last name.";

    };
    return (
      <div style={{ overflow: 'scroll' }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div style={{ marginTop: 30 }}>
            <BottomNavigation
              value="1"
              onChange={(event, newValue) => {
                // setValue(newValue);
                if (newValue == 0) {
                  this.props.router.push('/');
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
          <div style={{ justify: "center", alignItems: "center", marginBottom: 30 }}>
            <FormControl style={formStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">Select Last Name</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                // value={age}
                onChange={handleSelect}
              >
                {this.labels.map(label => (<MenuItem value={label}>{label}</MenuItem>))}
              </Select>
            </FormControl>

          </div>
          <div style={this.mapStyle}>
            {/* <Button onClick={this.exportMapConfig}>Export Config</Button> */}
            <div style={{ marginLeft: quarter_width / 2 - 60, marginBottom: 30 }}>
              <Card style={cardStyle}>
                <CardHeader
                  title={this.title}
                />
                <CardContent>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {this.text1}
                  </Typography>
                  <p></p>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {this.text2}
                  </Typography>
                  <p></p>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {this.text3}
                  </Typography>
                </CardContent>
              </Card>
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
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
