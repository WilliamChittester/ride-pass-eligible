var test = require('tape');

//if (typeof ridePassEligible === 'undefined') ridePassEligible = require('../ride-pass-eligible');

test('callback', function(t) {
  t.plan(2);

  var calledback = false;

  ridePassEligible('search', 0.75, function(eligibility,details) {
    calledback = true;

    t.ok(calledback, 'callback function ran');
    t.ok(typeof details === 'object')
  });
});

test('defaults to false', function(t) {
  t.plan(2);

  ridePassEligible(undefined, undefined, function(eligibility,details) {
    t.ok(!eligibility, 'undefined address returned false');
    t.ok(!details.addressFound, 'undefined address not found');
  });
});

test('validates walking distance', function(t) {
  t.plan(1);

  ridePassEligible(undefined, 0, function(eligibility,details) {
    t.ok(!eligibility, 'undefined address returned false');
  });

})
