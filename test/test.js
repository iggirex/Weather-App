"use strict";
const chai = require("chai");
const expect = chai.expect;
const logic = require("../src/logic.js");

chai.should();

describe("Kelvin to Farenheit conversion", function(){
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(288).should.equal(59);
    });
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(300).should.equal(80);
    });
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(1000).should.equal(1340);
    });
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(10).should.equal(-442);
    });
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(0).should.equal(-460);
    });
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(-100).should.equal(-640);
    });
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar("abc").should.equal("Must input a number type for temperature");
    });
});

describe("millimeter convertion to inches", function(){
    it("returns conversion of millimeters to inches", function(){
        logic._test.mmRaintoInches(100).should.equal(3.94);
    });
    it("returns conversion of millimeters to inches", function(){
        logic._test.mmRaintoInches(0).should.equal(0);
    });
    it("returns conversion of millimeters to inches", function(){
        logic._test.mmRaintoInches(-5).should.equal("Can't accept negative millimeters of rain");
    });
    it("returns conversion of millimeters to inches", function(){
        logic._test.mmRaintoInches("abc").should.equal("Must input a number type for millimeters of rain");
    });
    it("returns conversion of millimeters to inches", function(){
        logic._test.mmRaintoInches(5000).should.equal(196.85);
    });
});
