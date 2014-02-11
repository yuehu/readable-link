describe('readable link', function() {
  var valid = require('readable-link');

  function assert(a, b) {
    if (a !== b) {
      throw new Error(a + ' not equal ' + b);
    }
  }

  it('we donnot parse invalid url', function() {
    assert(valid('lepture.com').hint, "Invalid URL");
  });

  it('we donnot parse homepage', function() {
    assert(valid('http://lepture.com/').hint, "We don't parse homepage");
    assert(valid('http://lepture.com/index.html').hint, "We don't parse homepage");
  });

  it('we donnot parse this link', function() {
    assert(valid('http://lepture.com/account/signin').hint, "We don't parse this link");
  });

  it('we donnot parse this domain', function() {
    assert(valid('http://www.google.com/s?q=foo').hint, "We don't parse this domain");
  });

});
