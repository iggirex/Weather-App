"use strict"
var chai = require("chai");
var expect = chai.expect;

chai.should();

function returnsName(name){
  return name;
};

function addNumberToItself(n){
  return n + n;
}

describe("1st Unit test", function(){
  it("returns a name passed to the function", function(){
    returnsName("Eshwar").should.equal("Eshwar");
  });
});

describe("Math operation", function(){
  it("returns value of argument added to itself", function(){
    addNumberToItself(5).should.equal(10);
  });
}); 
