function el(el) {
  return document.querySelector(el);
}
let counter = el('.counter'),
  final = el('.final'),
  replay = el('#replay');
let nums = document.querySelectorAll('.nums span');
run()
console.log(final)

function reset() {
  counter.classList.remove('hide')
  final.classList.remove('show')
  nums.forEach((item) => {
    item.classList.value = '';
  })
  nums[0].classList.add('in')
}

function run() {
  nums.forEach((num, index) => {
    const next = nums.length - 1;

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && index !== next) {
        num.classList.remove('in');
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide');
        final.classList.add('show')
      }
    })
  })
}

replay.addEventListener('click', () => {
  reset()
  run()
})
