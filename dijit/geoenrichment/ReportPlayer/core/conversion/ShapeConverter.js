// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/JsonXmlConverter"],function(t,e){function i(t){return"string"==typeof t?Number(t.replace("px","")):Number(t)}var r={},a=/path|ellipse|circle|polygon|rect|line/,o=["fill","fill-opacity","stroke","storke-opacity"],s=["display"];r.svgJsonToShapeObject=function(r,n){function u(e,i){i=t.mixin({},i),e.attributes=e.attributes||{},o.forEach(function(t){var r=e.attributes[t];void 0===r&&(r=e.attributes[t]=i[t]),i[t]=r}),s.forEach(function(t){var r=i[t]||e.attributes[t];e.attributes[t]=r,i[t]=r}),e.tags&&e.tags.forEach(function(t){u(t,i)})}function h(t){var e=t.attributes;if(!e)return!1;if(!n.ignoreHiddenElements)return!0;if("none"===e.display)return!1;var i=e.fill&&"none"!==e.fill&&(void 0===e["fill-opacity"]||0!==e["fill-opacity"]),r=e.stroke&&"none"!==e.stroke&&(void 0===e["stroke-opacity"]||0!==e["stroke-opacity"]);return void 0===i&&void 0===r||(i||r)}n=n||{},n.ignoreHiddenElements&&(r=t.clone(r),u(r));var l={name:n.name||"",g:[],style:{}};if(r.attributes.viewBox){var c=r.attributes.viewBox.split(" ");l.viewBox={xmin:i(c[0]),ymin:i(c[1]),width:i(c[2]),height:i(c[3])}}else{if(!r.attributes.width||!r.attributes.height)return l;l.viewBox={xmin:0,ymin:0,width:i(r.attributes.width),height:i(r.attributes.height)}}return r.attributes.width&&(l.style.width=i(r.attributes.width)),r.attributes.height&&(l.style.height=i(r.attributes.height)),r.attributes.zoom&&(l.style.zoom=i(r.attributes.zoom)),l.preserveAspectRatio=r.attributes.preserveAspectRatio,l.showAsBar=r.attributes.showAsBar,l.showBarBackground=r.attributes.showBarBackground,e.queryJson(r,a).forEach(function(t){h(t)&&("path"===t.name?l.g.push({name:"path",d:t.attributes.d}):"ellipse"===t.name?l.g.push({name:"ellipse",cx:i(t.attributes.cx),cy:i(t.attributes.cy),rx:i(t.attributes.rx),ry:i(t.attributes.ry)}):"circle"===t.name?l.g.push({name:"circle",cx:i(t.attributes.cx),cy:i(t.attributes.cy),r:i(t.attributes.r)}):"polygon"===t.name?l.g.push({name:"polygon",points:t.attributes.points}):"rect"===t.name?l.g.push({name:"rect",x:i(t.attributes.x),y:i(t.attributes.y),width:i(t.attributes.width),height:i(t.attributes.height)}):"line"===t.name&&l.g.push({name:"line",x1:i(t.attributes.x1),y1:i(t.attributes.y1),x2:i(t.attributes.x2),y2:i(t.attributes.y2)}))}),l},r.shapeJsonToSvgJson=function(e){return{name:"svg",attributes:{width:e.style.width||void 0,height:e.style.height||void 0,viewBox:e.viewBox.xmin+" "+e.viewBox.ymin+" "+e.viewBox.width+" "+e.viewBox.height,preserveAspectRatio:e.preserveAspectRatio,showAsBar:e.showAsBar,showBarBackground:e.showBarBackground,zoom:e.style.zoom||void 0},tags:[{name:"g",tags:e.g.map(function(e){var i=t.mixin({},e);return delete i.name,{name:e.name,attributes:i}})}]}};var n={borderColor:"stroke",fillColor:"fill",borderAlpha:"stroke-opacity",fillAlpha:"fill-opacity",borderWidth:"stroke-width",borderDashArray:"stroke-dasharray",strokeMiterLimit:"stroke-miterlimit"},u={"stroke-opacity":1,"fill-opacity":1,"stroke-width":1},h={};for(var l in n)h[n[l]]=l;return r.applyStylesToSvgJson=function(t,i){e.queryJson(t,a).forEach(function(t){t.attributes=t.attributes||{};for(var e in i){var r=n[e];r&&(t.attributes[r]=i[e])}})},r.getStylesFromSvgJson=function(t){var i={},r=e.queryJson(t,a)[0];if(!r||!r.attributes)return i;for(var o in h){var s=r.attributes[o];void 0!==s&&(i[h[o]]=u[o]?Number(s):s)}return i},r});