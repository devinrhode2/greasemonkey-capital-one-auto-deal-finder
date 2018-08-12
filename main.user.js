// ==UserScript==
// @name         capital one auto deal finder
// @description  rounds price, mileage, and replaces carfax link with mileage/dollar value. Lowest means best deal!
// @namespace    https://openuserjs.org/users/devinrhode2
// @copyright    2018, devinrhode2 (https://openuserjs.org/users/devinrhode2)
// @license      MIT
// @version      0.0.1
// @author       DevinRhode2 (devinrhode2@gmail.com)
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @icon         https://autopreapproval.capitalone.com/app/assets/favicon.ico
// @match        https://autopreapproval.capitalone.com
// @match        https://autopreapproval.capitalone.com/inventory
// @match        https://autopreapproval.capitalone.com/vehicle-detail
// @run-at       document-end
// @grant        none
// ==/UserScript==

// ==OpenUserJS==
// @author devinrhode2
// ==/OpenUserJS==

/* jslint esversion: 6*/

window.runCapOneAutoScript = function() {
  'use strict';
  $('.detail-item').toArray().forEach(di => {
    if (di.firstChild.innerText) {
      var price1 = di.firstChild.innerText.replace(/,/g, '')
      var price2, finalPrice
      if (price1.includes('$')) {
        price2 = price1.substr(1)
        finalPrice = parseFloat(price2)
      } else {
        price2 = price1
        finalPrice = parseFloat(price2)
      }

      di.firstChild.innerText = finalPrice
    }
  })
  $('.detail-items').toArray().forEach(diSet => {
    diSet = diSet.children
    var mpd = parseInt(diSet[2].innerText)/parseInt(diSet[0].innerText)
    mpd = Math.round(mpd*100)/100
    diSet[1].innerHTML = mpd + ' miles/$'
  })
  $('.detail-item').toArray().forEach(di => {
    if (di.firstChild.innerText) {
      var price1 = di.firstChild.innerText.replace(/,/g, '')
      var price2, price3, finalPrice
      if (price1.includes('$')) {
        price2 = price1.substr(1)
        price3 = parseFloat(price2)
        finalPrice = Math.round(price3/100)*100
      } else {
        price2 = price1
        price3 = parseFloat(price2)
        finalPrice = Math.round(price3/100)*100
      }

      di.firstChild.innerText = finalPrice
    }
  })
  console.log('prices processed, capital one auto finder script successful v0.0.1');

};
setTimeout(runCapOneAutoScript, 1000);
