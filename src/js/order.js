import { batters, fillings, toppings, decoration } from './data.js'
import { update } from './storage.js'

let summaryItem = new Map()

function initOrder() {
    buildOptions()
    bindChipEvents()
    bindAddOrderEvent()
}

function bindAddOrderEvent() {
    document.getElementById('add-btn').addEventListener('click', () => {
        updateQuantity()
        addUUID()
        saveCurrentOrder()
        clearLocalOrder()
    });
}

function saveCurrentOrder() {
    update('summary', [summaryItem])
}

function buildOptions() {
    batters.forEach((item) => {
        document.getElementById('batter-group').innerHTML += `<div class="chip">${item}</div>`
    })
    fillings.forEach((item) => {
        document.getElementById('filling-group').innerHTML += `<div class="chip">${item}</div>`
    })
    toppings.forEach((item) => {
        document.getElementById('topping-group').innerHTML += `<div class="chip">${item}</div>`
    })
    decoration.forEach((item) => {
        document.getElementById('decoration-group').innerHTML += `<div class="chip">${item}</div>`
    })
}

function bindChipEvents() {
    document.getElementById('batter-group').addEventListener('click', function(e) {
        if (e.target.classList.contains('chip')) selectChip(e.target, 'batter')
    })

    document.getElementById('filling-group').addEventListener('click', function(e) {
        if (e.target.classList.contains('chip')) selectChip(e.target, 'filling')
    })

    document.getElementById('filling-extra-group').addEventListener('click', function(e) {
        if (e.target.classList.contains('chip')) selectChip(e.target, 'filling-extra')
    })

    document.getElementById('topping-group').addEventListener('click', function(e) {
        if (e.target.classList.contains('chip')) selectChip(e.target, 'topping')
    })

    document.getElementById('decoration-group').addEventListener('click', function(e) {
        if (e.target.classList.contains('chip')) selectChip(e.target, 'decoration')
    })
}

function selectChip(chip, groupName) {
    const group = document.getElementById(`${groupName}-group`);

    [...group.children].forEach(chip => {
        if (chip.classList.contains('selected')) {
            chip.classList.remove('selected')
        }
    })

    chip.classList.add('selected')
    summaryItem.set(groupName, chip.textContent)
}

function updateQuantity() {
    const quantityInput = document.getElementById("quantity")
    const value = quantityInput.value
    summaryItem.set('quantity', value)
}

function addUUID() {
    const id = crypto.randomUUID()
    summaryItem.set('id', id)
}


function clearLocalOrder() {
    const batters = document.getElementById('batter-group').children
    const fillings = document.getElementById('filling-group').children
    const fillings_extra = document.getElementById('filling-extra-group').children
    const topping = document.getElementById('topping-group').children
    const decoration = document.getElementById('decoration-group').children
    
    const quantity = document.getElementById("quantity");

    [...batters, ...fillings, ...fillings_extra, ...topping, ...decoration].forEach(item => {
        item.classList.remove('selected')
    })

    quantity.value = 1

    summaryItem = new Map()
}


initOrder()