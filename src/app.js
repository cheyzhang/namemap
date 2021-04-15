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
import Grid from '@material-ui/core/Grid';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, Explore, Info } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

class About extends Component {

  render() {
    const quarter_width = window.innerWidth / 4;
    const quarter_height = window.innerHeight / 4;
    // const navStyle = {
    //   align: 'center'
    // };
    // const mapStyle = {
    //   position: 'fixed',
    //   width: '50%',
    //   height: '50%',
    //   marginTop: quarter_height - 60,
    //   marginLeft: quarter_width
    // };
    const cardStyle = {
      maxWidth: 500,
      marginTop: 30,
      paddingLeft: 30,
      paddingRight: 30
    };
    // const navStyle = {
    //   align: 'center',
    //   marginTop: 30
    // };
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div style={{ marginTop: 30 }}>
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
        <div>
          <Card style={cardStyle}>
            <CardHeader
              title="Welcome to NameMap!"
            />
            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                NameMap maps the spread of individuals of a given Chinese surname over time and provides insights about these groups of people.
              </Typography>
              <p></p>
              <Typography variant="body1" color="textSecondary" component="p">
                Click "Map" in the navigation bar above to explore.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt="NameMap example"
              height="300"
              image="../images/210415.gif"
              title="NameMap Map"
            />
            <p></p>
            <p></p>
          </Card>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(About);
