import { 
    addOn,
    changePlainBtnSummary,
    btnFinish,
    option,
    btn,
    sections,
    check
} from "./js/consts.js"

import { 
    changeFocusedElement,
    
} from "./js/fn.js"

import { 
    setData 
} from "./js/set.js"

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

addOn.forEach(addon => {
    addon.addEventListener('click', (e) => {
        addon.classList.toggle('selected')
        addon.children[0].classList.toggle('checked')
    })
})


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

                case 'add-ons':
                    const addon = sets.addons()
                    err = addon.error
                break;

                case 'finish':
                    err = true
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

changePlainBtnSummary.addEventListener('click', () => {
    changeFocusedElement('plain')
            
    sections.forEach(section => {
        section.classList.add('unfocus')
        section.classList.remove('focus')
        if ('plain' === section.getAttribute('id')) {
            section.classList.remove('unfocus')
            section.classList.add('focus')
        }
    })
})

btnFinish.addEventListener('click', () => {
    sections.forEach(section => {
        section.classList.add('unfocus')
        section.classList.remove('focus')
        if ('finish' === section.getAttribute('id')) {
            section.classList.remove('unfocus')
            section.classList.add('focus')
        }
    })
})