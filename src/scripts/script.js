const block = document.getElementById('block')
const login_container = document.querySelector('.login_container')
const modal_overlay = document.querySelector('.modal_overlay')
const login_btn = document.querySelector('.login_btn')
document.getElementById('postform-text').addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;}
})

async function readInput(event) {
  event.preventDefault()

  const title = document.querySelector('#fileName').value
  const text = document.querySelector('#postform-text').value
  const randomURL = Math.random().toString(36).substring(2, 8)
  
  if (!title || !text) {
    alert('Заполните все поля', 'error')
    return
  }

  try {
    const response = await fetch('/api/create-text', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        text: text,
        randomURL: randomURL
      })
    })

    const data = await response.json()

    if (data.success) {
      document.getElementById('main-form').reset()
      console.log('data success')
      alert(`Ваша ссылка - http://localhost:3000/show/${randomURL}`)
    }
    else {
      console.log('data error', data.error)
    }

  }
  catch (error) {
    console.error('Ошибка при отправке на сервер:', error)
  }
}

async function loginAdmin(event) {
  event.preventDefault()

    const input = document.getElementById('passwordInput').value
    console.log(input)

    try {
        const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            password: input
        })
    })
    const data = await response.json()
    if (data.success) {
        console.log('data success')
        window.location.href='/admin'
        return
    }
    else {
        console.error('data error', data.error)
    }
    }
    catch (error) {
        console.error('Ошибка при отправке на сервер', error)
    }
}
document.getElementById('login').addEventListener('click', loginAdmin)

document.getElementById('btn').addEventListener('click', readInput)
login_btn.addEventListener('click', (event) => {
  event.preventDefault()
  login_container.classList.remove('closed')
  modal_overlay.classList.remove('closed')
})
modal_overlay.addEventListener('click', () => {
  login_container.classList.add('closed')
  modal_overlay.classList.add('closed')
})