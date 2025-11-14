  const block = document.getElementById('block')

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

document.getElementById('btn').addEventListener('click', readInput)