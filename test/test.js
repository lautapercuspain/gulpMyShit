var should = require('chai').should,
    expect = require('chai').expect,
    assert = require('chai').assert,
    app = require('../app/scripts/app');

describe('Gulp test', function(){
  before(function(){
    // ...
  });

  it('Should have the app', function(){
    expect(app).to.exist;
  });
});