async function loadPaste() {
    const inner_box = document.querySelector('.inner_box')
    const path_parts = window.location.pathname.split('/')
    const pasteurl = path_parts[path_parts.length - 1]

    try {
        const response = await fetch(`/api/paste/${pasteurl}`)
        const data = await response.json()

        if (data.paste) {
            
        }
    }
}