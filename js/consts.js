export const btn = document.querySelectorAll('a.btn-change-section')

export const sections = document.querySelectorAll('main.content section')

export const span = document.querySelectorAll('span.circle-step-id')

export const option = document.querySelectorAll('div.option')

export const check = document.querySelector('input#time-plain')

export const priceAddon = document.querySelectorAll('span.price-add-on')

export const basicPricesAddons = [1, 2, 2] 

export const addOn = document.querySelectorAll('article.add-on')

export const changePlainBtnSummary = document.querySelector('a#change-plain')

export const summaryElementsSetData = Object.freeze({
    title: document.querySelector('h4.selection-plain'),
    selectionPrice: document.querySelector('section#summary span.price'),
    otherPricesContainer: document.querySelector('section#summary .others-prices'),
    total: document.querySelector('section#summary .total')
})

export const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const btnFinish = document.querySelector('a.btn-change-section#finish')

export const data = {
    info: {
        name: '',
        email: '',
        phone: ''
    },

    plain: {
        selection: '',
        type: ''
    },

    addons: []
}