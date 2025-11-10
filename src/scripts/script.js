async function readInput(event) {
  event.preventDefault()

  const title = document.querySelector('#fileName').value
  const text = document.querySelector('#postform-text').value
  
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
        text: text
      })
    })

    const data = await response.json()

    if (data.success) {
      console.log('data success')
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