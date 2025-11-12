// document.addEventListener('DOMContentLoaded',function() {
//     loadPaste()
// })

async function loadPaste() {
    const path_parts = window.location.pathname.split('/')
    const pasteurl = path_parts[path_parts.length - 1]

    try {
        const response = await fetch(`/api/paste/${pasteurl}`)
        const data = await response.json()

        if (data.paste) {
            displayPaste(data.paste)
            console.log(data.paste)
        }
    }
    catch (error) {
        console.error('Ошибка при получении данных', error)
    }
}

function displayPaste(paste) {
    document.querySelector('.blockText').innerHTML = `
    <div class="inner_box">
            <h3 class="title">${paste.title}</h3>
            <p class="date">${new Date(paste.StartDate).toLocaleString('ru-RU')} - ${new Date(paste.EndDate).toLocaleString('ru-RU')}</p>
            <p class="content">${paste.text}</p>
        </div>
    `
}

document.querySelector('button').addEventListener('click', loadPaste)