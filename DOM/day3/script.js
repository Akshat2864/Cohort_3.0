// //attributes
// //getAttribute, setAttribute, removeAttribute, hasAttribute


// // const h3= document.querySelector('#head3')

// // let res= h3.getAttribute('class')

// // h3.setAttribute('width', '200')

// // console.log(res);



// //data -* , dataset

// // const user= document.querySelector('#user')

// // console.log(user.getAttribute('data-user-id'));

// // user.dataset.userId='678'

// // console.log(user.getAttribute('data-user-id'));



// //input.value, input.getAttribute("val")


// // const inp= document.querySelector('input')
// // const btn= document.querySelector('button')

// // console.log(inp.value)

// // btn.addEventListener('click', ()=>{
// //     console.log(inp.value);
// //     console.log(inp.getAttribute('value'))


    
// // })


// // Creating inserting and removing via DOM
// const main= document.querySelector('main')

// let foot= document.createElement("footer")
// let span= document.createElement("span")
// // console.log(foot);

// span.innerHTML='i am <i>dynamic....</i>'

// // main.appendChild(foot)
// // main.appendChild(span)
// // main.appendChild(foot, span)   WRONG

// main.append(foot, span)   //RIGHT

// //removeChild() - removes elemet
// //insertBefore() - 


const main= document.querySelector('main')

const box1= document.createElement('div')
const box2= document.createElement('div')
const box3= document.createElement('div')

box1.classList.add('box')
box2.classList.add('box')
box2.style.backgroundColor='yellow'
box3.classList.add('box')
box3.style.backgroundColor='green'


main.append(box1, box2, box3)
// main.prepend(box3)   sabse pehle insert karo

// main.before(box2)


