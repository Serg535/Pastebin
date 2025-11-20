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