const btn = document.querySelectorAll('a.btn-change-section')

const sections = document.querySelectorAll('main.content section')

const span = document.querySelectorAll('span.circle-step-id')

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const data = {
    info: {
        name: '',
        email: '',
        phone: 0
    },
}

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

class setData {
    info() {
        const name = document.querySelector('input#name').value
        const email = document.querySelector('input#email').value
        const phone = document.querySelector('input#phone').value

        if (name === undefined || email === undefined || phone === undefined) {
            return {
                error: true
            }
        }

        if (!email.match(regexEmail)) {
            return {
                error: true
            }
        }

        if (isNaN(phone)) {
            return {
                error: true
            }
        }

        data.info.name = name
        data.info.email = email
        data.info.phone = parseInt(phone)
    }
}


btn.forEach(element => {
    element.addEventListener('click', (e) => {
        setTimeout(() => {
            let err = false;

            const idArticle = window.location.href.split('#')[1]

            const sets = new setData()
            
            switch (e.target.getAttribute('data-type')) {
                case 'info':
                    const info = sets.info()
                    err = info.error
            }

            if (err) {
                console.log(err)
            }

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