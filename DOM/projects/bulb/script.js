const bulb = document.querySelector('.bulb');
const btn = document.querySelector('button')

// let flag = true

// btn.addEventListener('click', function(){
//     if(flag){
//         bulb.style.backgroundColor="yellow"
//         btn.innerText='OFF'
//         flag= false
//     }else{
//         bulb.style.backgroundColor="transparent"
//         btn.innerText='ON'
//         flag= true;
//     }
    
// })


btn.addEventListener('click', function(){
    if(bulb.classList.toggle('lightUp')){ //toggle return bool value
        btn.textContent='OFF'
    }else{
        btn.textContent='ON'
    }
})