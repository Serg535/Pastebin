const button = document.querySelector('#btn')
const button_check = document.querySelector('#btn_check')
let title = ''
let text = ''

function readInput() {
  title = document.querySelector('#fileName').value
  text = document.querySelector('#postform-text').value
  return {title, text}
}

button.addEventListener('click', readInput)