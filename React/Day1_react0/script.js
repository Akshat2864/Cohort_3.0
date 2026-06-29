// let h1= document.createElement('h1') //dom
// h1.textContent = 'hello from real dom';
// document.body.append(h1);

// //react DOM, Virtual DOM----------

// let rh1= React.createElement('h1', {class:'box'}, 'hello i am fron react') //react  (tag, props, children )

// let spanUnderH1= React.createElement('h1', {}, React.createElement('span', {}, 'i am under h1 '))
// // document.body.append(rh1);

// console.log('Real DOM ->', h1)
// console.log('Virtual DOM ->', rh1)

// let realDOMElem = document.querySelector('#root')
// let rootOfReact = ReactDOM.createRoot(realDOMElem);

// rootOfReact.render(spanUnderH1)

import { a, sum } from "./main.js";

console.log("i am from main.js", a);

let res = sum(30, 80);
console.log(res);

let realDomElem = document.querySelector("#root");

let div = React.createElement("div", {}, 
    [
  React.createElement("h1",{},React.createElement("span", {}, "i am span...")),
  React.createElement("h2",{},React.createElement("span", {}, "i am span 2..."))
]);

ReactDOM.createRoot(realDomElem).render(div);



//overwrittesss---
// let h1= React.createElement('h1', {}, 'i am simple h1')

// ReactDOM.createRoot(realDomElem).render(h1);
