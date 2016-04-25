var assert = require('assert'),
    sdi = require('..');

describe('sdi', function() {
  it('should say hello', function(done) {
    assert.equal(sdi(), 'Hello, world');
    done();
  });
});

