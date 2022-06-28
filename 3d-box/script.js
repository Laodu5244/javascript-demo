function el(e) {
  return document.getElementById(e)
}
let box_ = el("boxes"), btn = el('btn');

btn.addEventListener('click', () => {
  box_.classList.toggle('big')
})

function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
      box_.appendChild(box)
    }
  }
}
createBoxes()
