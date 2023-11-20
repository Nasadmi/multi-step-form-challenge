import { 
    summaryElementsSetData,
    priceAddon,
    basicPricesAddons,
    span,
    data
} from "./consts.js"

export const changeFocusedElement = (target) => {
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

export const setDataAddons = (type) => {
    let textType;
    
    if (priceAddon.length <= 0) {
        return
    }

    if (type === 'yearly') {
        textType = 'yr'
    } else {
        textType = 'mo'
    }

    priceAddon[0].innerText = `+$${type === 'yearly' ? basicPricesAddons[0] * 10 : basicPricesAddons[0]}/${textType}`
    priceAddon[1].innerText = `+$${type === 'yearly' ? basicPricesAddons[1] * 10 : basicPricesAddons[1]}/${textType}`
    priceAddon[2].innerText = `+$${type === 'yearly' ? basicPricesAddons[2] * 10 : basicPricesAddons[2]}/${textType}`
}

export const summarySetData = () => {
    let selectionPrice;
    let multiply;
    let addonsPrices = [];

    const textTypeTime = data.plain.type === 'yearly' ? 'yr' : 'mo'

    if (data.plain.type === 'yearly') {
        multiply = 10
    } else {
        multiply = 1
    }

    switch (data.plain.selection) {
        case 'arcade':
            selectionPrice = 9
        break;

        case 'advanced':
            selectionPrice = 12
        break;

        case 'pro':
            selectionPrice = 15
        break;
    }

    summaryElementsSetData.title.innerText = `${data.plain.selection} (${data.plain.type})`
    summaryElementsSetData.selectionPrice.innerText = 
    `
    $${selectionPrice * multiply}/${textTypeTime}
    `

    summaryElementsSetData.otherPricesContainer.innerHTML = ``

    summaryElementsSetData.total.children[0].innerText = `Total (per ${data.plain.type === 'yearly' ? 'year' : 'month'})`

    data.addons.forEach(addon => {
        summaryElementsSetData.otherPricesContainer.innerHTML += 
        `
            <div class="other-price">
                <span class="text-extras">${addon.split('_').join(' ')}</span>
                <span class="price-extras">+$${addon === 'online_service' ? 1 * multiply : 2 * multiply}/${textTypeTime}</span>
            </div>
        `
    })

    const otherPricesChildren = document.querySelectorAll("section#summary div.other-price")

    otherPricesChildren.forEach(others => {
        addonsPrices.push(parseInt(others.textContent.split('\n').join(' ').split('$')[1].split(' ')[0].split('/')[0]))
    })

    summaryElementsSetData.total.children[1].innerText = 
    `
        $${(selectionPrice * multiply) + (addonsPrices.reduce((a, b) => a + b, 0))}/${textTypeTime}
    `
}
