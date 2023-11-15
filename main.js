const btn = document.querySelectorAll('a.btn-change-section')

const sections = document.querySelectorAll('main.content section')

const span = document.querySelectorAll('span.circle-step-id')

const changeFocusedElement = (target) => {
    const focusedElement = document.querySelector('span.focus')
    if (focusedElement) {
        span.forEach(element => {
            if (element.getAttribute('data-id') === target) {
                element.classList.add('focus')
            }
        })
        focusedElement.classList.remove('focus')
    }
}

btn.forEach(element => {
    element.addEventListener('click', (e) => {
        setTimeout(() => {
            const idArticle = window.location.href.split('#')[1]
            changeFocusedElement(idArticle)
            sections.forEach(section => {
                if (idArticle === undefined) {
                    return
                }
                section.classList.remove('focus')
                if (idArticle === section.getAttribute('id')) {
                    section.classList.add('focus')
                }
            })
        }, 100)
    })
})