async function get_all() {

    try {
        const response = await fetch(`/api/admin/getAll`)
        const data = await response.json()

        if (data.pastes) {
            displayPastes(data.pastes)
        }
    }
    catch (error) {
        console.error('Ошибка при получении данных', error)
    }
}

function displayPastes(pastes) {
    const block = document.querySelector('.inner')
  if (pastes.length === 0) {
    block.innerHTML = `Нет данных`
    return
  }
  block.innerHTML = pastes.map(paste => `
    <div class="inner_box">
            <h3 class="title">${paste.title}</h3>
            <p class="date">${new Date(paste.StartDate).toLocaleString('ru-RU')} - ${new Date(paste.EndDate).toLocaleString('ru-RU')}</p>
            <div class="content" style="white-space: pre-wrap;">${paste.text}</div>
        </div>
    `).join('')
}

document.getElementById('btn_get_all').addEventListener('click', get_all)