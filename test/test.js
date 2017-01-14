"use strict";
var chai = require("chai");
var expect = chai.expect;
var logic = require("../src/logic.js");

chai.should();

function returnsName(name){
    return name;
}

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

describe("Kelvin to Farenheit conversion", function(){
    var angular = "";
    it("returns kelvin - 273 times (5/9)", function(){
        logic._test.kelvinToFar(288).should.equal(59)
    })
})
