const btn = document.querySelectorAll('a.btn-change-section')

const sections = document.querySelectorAll('main.content section')

const span = document.querySelectorAll('span.circle-step-id')

const option = document.querySelectorAll('div.option')

const check = document.querySelector('input#time-plain')

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const data = {
    info: {
        name: '',
        email: '',
        phone: ''
    },

    plain: {
        selection: '',
        type: ''
    }
}

option.forEach(div => {
    div.addEventListener('click', (e) => {
        let selectedElement = document.querySelector('div.option.selected')
        
        if (e.target.classList.contains('selected')) {
            return
        }

        if (selectedElement === null) {
            e.target.classList.add('selected')
        } else {
            e.target.classList.add('selected')
            selectedElement.classList.remove('selected')
        }
    })
})

check.addEventListener('change', () => {
    const prices = document.querySelectorAll('span.price')
    const text = document.querySelectorAll('span.text-yearly')
    if (check.checked) {
        prices[0].innerText = '$90/yr'
        prices[1].innerText = '$120/yr'
        prices[2].innerText = '$150/yr'
        text.forEach(element => {
            element.classList.add('show')
        })
    } else {
        prices[0].innerText = '$9/mo'
        prices[1].innerText = '$12/mo'
        prices[2].innerText = '$15/mo'
        text.forEach(element => {
            element.classList.remove('show')
        })
    }
    
})

const changeFocusedElement = (target) => {
    let focusedElement = document.querySelector('span.focus')
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
        const name = document.querySelector('input#name')
        const email = document.querySelector('input#email')
        const phone = document.querySelector('input#phone')

        const nameError = name.parentElement.children[0].children[0]
        const emailError = email.parentElement.children[0].children[0]
        const phoneError = phone.parentElement.children[0].children[0]

        if (name.value === '' || email.value === '' || phone.value === '') {

            nameError.innerText = 'This field is required'
            emailError.innerText = 'This field is required'
            phoneError.innerText = 'This field is required'

            return {
                error: true
            }
        }

        nameError.innerText = ''
        emailError.innerText = ''
        phoneError.innerText = ''

        if (!email.value.match(regexEmail)) {
            email.parentElement.children[0].children[0].innerText = 'Invalid email'

            return {
                error: true
            }
        }

        nameError.innerText = ''
        emailError.innerText = ''
        phoneError.innerText = ''

        if (isNaN(phone.value.split('+').join('').split(' ').join(''))) {
            phone.parentElement.children[0].children[0].innerText = 'Invalid phone number'

            return {
                error: true
            }
        }

        data.info.name = name.value
        data.info.email = email.value
        data.info.phone = phone.value

        return {
            error: false
        }
    }

    plain() {
        const selectedElement = document.querySelector('div.option.selected')
        if (selectedElement === null) {
            document.querySelector('article.options').parentElement.children[2].classList.add('show')

            return {
                error: true
            }
        }

        document.querySelector('article.options').parentElement.children[2].classList.remove('show')
        data.plain.selection = selectedElement.getAttribute('id')
        data.plain.type = check.checked ? 'yearly' : 'monthly'

        return {
            error: false
        }
    }
}

const sets = new setData()

btn.forEach(element => {
    element.addEventListener('click', (e) => {
        setTimeout(() => {
            let err;

            const idArticle = window.location.href.split('#')[1]

            switch (e.target.getAttribute('data-type')) {
                case 'info':
                    const info = sets.info()
                    err = info.error
                break;

                case 'plain':
                    const plain = sets.plain()
                    err = plain.error
                break;
                
                case null:
                    err = false
                break;
            }

            if (err) {
                return
            }

            changeFocusedElement(idArticle)
            
            sections.forEach(section => {
                if (idArticle === undefined) {
                    return
                }

                section.classList.add('unfocus')
                section.classList.remove('focus')

                if (idArticle === section.getAttribute('id')) {
                    section.classList.remove('unfocus')
                    section.classList.add('focus')
                }
            })
        }, 100)
    })
})
