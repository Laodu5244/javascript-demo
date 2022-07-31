let $text = document.getElementById('text')
let $speed = document.getElementById('speed')
let text = 'We Love Java Script !'
let idx = 1
let speed = 300 / $speed.value

function writeText() {
  $text.innerText = text.slice(0, idx)
  idx++
  if (idx > text.length) idx = 1
  setTimeout(writeText, speed)
}

$speed.addEventListener('input', (e) => {
  speed = 300 / e.target.value
})
writeText()