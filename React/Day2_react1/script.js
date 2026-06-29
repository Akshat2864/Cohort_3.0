import React from 'react';

let root = document.querySelector('#root')

const h1= React.createElement('h1', {}, 'hwllo this is from react')
console.log(h1)

ReactDOM.createRoot(root).render(h1)