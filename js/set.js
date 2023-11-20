import { 
    setDataAddons,
    summarySetData
} from './fn.js'

import {
    regexEmail,
    data,
    check
} from './consts.js'

export class setData {
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

        setDataAddons(data.plain.type)

        return {
            error: false
        }
    }

    addons() {
        const addonsSelected = document.querySelectorAll('article.add-on.selected')

        data.addons = []

        if (addonsSelected.length <= 0) {
            summarySetData()
            
            return {
                error: false
            }
        }

        addonsSelected.forEach(selected => {
            data.addons.push(selected.getAttribute('id'))
        })

        summarySetData()

        return {
            error: false
        }
    }
}
