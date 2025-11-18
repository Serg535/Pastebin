const block = document.getElementById('block')
document.getElementById('postform-text').addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;}
})

document.getElementById('postform-text').addEventListener('paste', function(e) {
    e.preventDefault();
    
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const start = this.selectionStart;
    const end = this.selectionEnd;
    
    // Функция для сохранения отступов
    function preserveIndentation(text) {
        return text
            .replace(/\t/g, '    ') // Табы -> 4 пробела
            .replace(/^ +/gm, spaces => '&nbsp;'.repeat(spaces.length)) // Пробелы в начале строк
            .replace(/ {2}/g, ' &nbsp;'); // Двойные пробелы в тексте
    }
    
    const preservedText = preserveIndentation(pastedText);
    this.value = this.value.substring(0, start) + preservedText + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + preservedText.length;
});

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