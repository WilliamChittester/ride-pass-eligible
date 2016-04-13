# RidePass Eligibility

*Developed for [PSU Transportation Services](http://transportation.psu.edu/)*

A script for checking whether an address is outside a distance from the nearest free bus stop.

Built around the Google Maps JavaScript API. Requires credentials.

## Usage

``` javascript
ridePassEligible(address, distance, function(eligibility, details) {

  // Do something with true/false eligibility
  // and reference specific details.
  console.log(eligibility, details)
  
});
```

## Developing

With [browserify](http://browserify.org/), run:

`watchify tests/ride-pass-eligible-test.js -o test.js`

Then watch test results in console for `index.html`.

`python -m SimpleHTTPServer 8000`
