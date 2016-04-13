// If using browserify
if (typeof module !== 'undefined') module.exports = ridePassEligible;

// Main function for checking eligibility
function ridePassEligible(address, distance, callback) {

  // Setup default responses
  var eligible = false;
  var details = {
    'addressFound': false,
    'location': undefined,
    'nearestStopLocation': undefined,
    'distance': undefined
  }

  // Catch if address parameter is undefined
  if (!address) {
    callback(eligible, details);
  } else {

    // Geocode address with Google
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address + 'State College, PA' }, function(results, status) {

      // If sucessfully geocoded...
      if (status == google.maps.GeocoderStatus.OK) {
        details.addressFound = true;

        // Pull coordinates from address geocoding results
        var googleLocation = results[0].geometry.location;
        details.location = googleLocation;

        // List of latitude/longitude coordinates for bus stops to measure distance from
        var busStops = [
          {'lat':40.8050003,'lon':-77.8608017}, //
          {'lat':40.8070984,'lon':-77.8588028},
          {'lat':40.8008003,'lon':-77.8647995},
          {'lat':40.7975998,'lon':-77.8671036},
          {'lat':40.7919998,'lon':-77.8647995},
          {'lat':40.7929001,'lon':-77.8674011},
          {'lat':40.7924004,'lon':-77.8710022},
          {'lat':40.7905998,'lon':-77.8718033},
          {'lat':40.7944984,'lon':-77.8613968},
          {'lat':40.7972984,'lon':-77.8578033},
          {'lat':40.7989998,'lon':-77.8585968},
          {'lat':40.8013000,'lon':-77.8588028},
          {'lat':40.8025017,'lon':-77.8567963},
          {'lat':40.8050003,'lon':-77.8516998},
          {'lat':40.8055992,'lon':-77.8486023},
          {'lat':40.8114014,'lon':-77.8529968},
          {'lat':40.8101006,'lon':-77.8559036},
          {'lat':40.8140984,'lon':-77.8555984},
          {'lat':40.8181992,'lon':-77.8506012},
          {'lat':40.8288002,'lon':-77.8479996},
          {'lat':40.8301010,'lon':-77.8448029},
          {'lat':40.8326988,'lon':-77.8420029},
          {'lat':40.8185005,'lon':-77.8436966},
          {'lat':40.8199997,'lon':-77.8453979}
        ];


        // Transform bus stops coordinates to a list of Google Maps Lat/Lng's
        googleBusStops = busStops.map(function(d,i) {
                    return new google.maps.LatLng(d.lat, d.lon)
        });

        // Setup Google Maps Distance Matix service
        var service = new google.maps.DistanceMatrixService();

        // Get walking distance matrix
        service.getDistanceMatrix(
        {
          origins: [googleLocation],
          destinations: googleBusStops,
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.METRIC,
        }, function(response, status) { // With matrix...

            // If valid...
            if (status == google.maps.DistanceMatrixStatus.OK) {
              var results = response.rows[0].elements;

              // Create empty object to hold nearest distance
              var nearest = { 'distance': undefined, 'busStop': undefined };

              // For each bus stop, check walking distance compared to input distance parameter
              for (var i = 1; i < results.length; i++) {
                  var path = results[i];
                  if (path.distance.value / 1609.34 < nearest.distance || typeof nearest.distance === 'undefined') {
                      nearest.distance = path.distance.value / 1609.34;
                      nearest.busStop = i;
                  }
              }

              details.nearestStopLocation = googleBusStops[nearest.busStop];
              details.distance = nearest.distance;

              // If nearest distance is greater than input distance
              if (nearest.distance >= distance) {
                  eligible = true;
              }

              // Run input callback function with results from eligibility test
              callback(eligible, details);
            }
          });

      } else {
        throw "Geocode was not successful for the following reason: " + status;
      }
    });

  }

}
