let loading = el('.loading')
let bg = el('.bg')
let load = 0
let int = setInterval(blurring,20)

function blurring(){
  load++
  if(load > 99){
    clearInterval(int)
  }
  loading.innerText = `${load}%`
  loading.style.opacity = scale(load,0,100,1,0)
  bg.style.filter = `blur(${scale(load,0,100,30,0)}px)`
}

const scale = (num,min,max,out,out_max) =>{
  return ((num-min)*(out_max-out))/(max-min)+out
}

function el(el){
  return document.querySelector(el)
}