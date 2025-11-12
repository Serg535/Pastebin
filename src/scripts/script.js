  const block = document.getElementById('block')

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

async function get_all() {

  try {
  const response = await fetch('/api/pastes')

  const data = await response.json()

  if (data.pastes) {
    displayPastes(data.pastes)
    console.log(data.pastes)
  }
  }
  catch (error) {
    console.error('ошибка получения текстов', error)
  }
  
}

function displayPastes(pastes) {
  if (pastes.length === 0) {
    block.innerHTML = `Нет данных`
    return
  }
  block.innerHTML = pastes.map(paste => `
    <div class="inner_paste">
    <h3>${paste.title}</h3>
    <p>${new Date(paste.StartDate).toLocaleString('ru-RU')} - ${new Date(paste.EndDate).toLocaleString('ru-RU')}</p>
    <a href="/show/${paste.url}">${paste.url}</a>
    <p>${paste.text}</p>
    </div>
    `).join('')
}
document.getElementById('btn_get').addEventListener('click', get_all)
document.getElementById('btn').addEventListener('click', readInput)