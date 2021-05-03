# NameMap

NameMap maps the spread of individuals of a given Chinese surname over time and provides insights about these groups of people.

This data comes from CBDB, the China Biographical Database, and finds all individuals who are mapped to valid "postings," i.e. there are records of where they worked. Women at the time were recorded by their relationship to men, so there unfortunately is much less data about their activities. The data was mapped using KeplerGL, based on starter code from Uber's Vis Academy.

Created by Cheyenne Zhang, Princeton University '22. Thanks to Professor Brian Kernighan, Dr. Zoe LeBlanc and all the students of COS IW 06.

### Running Locally
Install dependencies:
```
npm install
```

Add your MapBoxAccess token:
```
export MapboxAccessToken=<your_mapbox_token>
```

Start running: 
```
npm start
```
