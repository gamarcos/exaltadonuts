import { switchTab } from './navigation.js';
import { get } from './storage.js'

export function initSummary() {
    buildCards(get('summary'))
    bindFinishEvent()
}

function buildCards(data) {
    const items = data.map(obj => {
        const inner = Object.entries(obj).map(([key, value]) => {
            return `
          <div class="summary-item">
            <strong>${key}:</strong> ${value}
          </div>`;
        }).join("");

        return `
        <div class="section">
          ${inner}
        </div>`;
    }).join("");

    const isButtonEnabled = data.length > 0
    const buttonHTML = `<button class="submit-btn" id="finish-btn" ${isButtonEnabled ? '' : 'disabled'}>Finalizar pedido</button>`

    document.getElementById('summary-view').innerHTML = items + buttonHTML
}

function bindFinishEvent() {
    document.getElementById('finish-btn').addEventListener('click', (e) => { switchTab('info') })
}

window.initSummary = initSummary;