# NameMap

NameMap maps the spread of individuals of a given Chinese surname over time and provides insights about these groups of people. It currently supports the top 150 most common Chinese surnames.

NameMap's data comes from [CBDB](https://projects.iq.harvard.edu/cbdb), the China Biographical Database, and contains all individuals who are mapped to valid "postings," i.e. there are records of where they worked in governmental positions. The data was mapped using [KeplerGL](https://kepler.gl), based on starter code from Uber's [Vis Academy](https://vis.academy/#/).

Download NameMap[here](https://github.com/cz10/namemap/).

Created by Cheyenne Zhang, Princeton University '22. Thanks to Professor Brian Kernighan, Dr. Zoe LeBlanc and all the students of COS IW 06.

### Running Locally

Create a folder where you'd like this code to live. Clone this repository into the folder:
```
git clone https://github.com/cz10/namemap/
cd namemap
```

Install dependencies:
```
npm install
```

Add your [MapBoxAccess token](https://docs.mapbox.com/help/getting-started/access-tokens/):
```
export MapboxAccessToken=<your_mapbox_token>
```

Start running: 
```
npm start
```

Navigate to [http://localhost:8080/](http://localhost:8080/) in your preferred browser to begin exploring NameMap!
