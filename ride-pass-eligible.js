// If using browserify
if (typeof module !== 'undefined') module.exports = ridePassEligible;

// Main function for checking eligibility
function ridePassEligible(address, distance, callback) {

  // Setup default responses
  var eligible = false;
  var details = {
    'addressFound': false,
    'coordinates': undefined,
    'nearestStop': {
      'name': undefined,
      'coordinates': undefined
    },
    'distance': undefined
  }

  // Catch if address parameter is undefined
  if (!address) {
    callback(eligible, details);
  } else {

    // Geocode address with Google


        // With geocoding response...

        // Load bus stops from a GeoJSON object

        // Transform bus stops GeoJSON to a list of Google Maps Lat/Lng's

        // Setup Google Maps Distance Matix service
        var service = new google.maps.DistanceMatrixService();

        // Get walking distance matrix

          // With matrix...

          // If valid...

            // For each bus stop, check walking distance compared to input distance parameter

    callback(eligible, details);
  }

}
