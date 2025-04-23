import { labels } from './data.js';
import { switchTab } from './navigation.js';
import { get, remove } from './storage.js'

export function initSummary() {
  buildCards(get('summary'))
}

function buildCards(data) {

  let id = ''

  const items = data.map(obj => {
    const inner = Object.entries(obj).map(([key, value]) => {
      id = key == 'id' ? value : ''
      return `
          <div class="summary-item">
            <strong>${labels[key]}:</strong> ${value}
          </div>`;
    }).join("");

    return `
        <div class="section" data-id=${id}>
              <button class="delete-btn" aria-label="Remover">
                  <img src="./src/icon/trash.svg" alt="Remover" width="20" height="20" />
              </button>
          ${inner}
        </div>`;
  }).join("");

  const isButtonEnabled = data.length > 0
  const buttonHTML = `<button class="submit-btn" id="finish-btn" ${isButtonEnabled ? '' : 'disabled'}>Finalizar pedido</button>`

  document.getElementById('summary-view').innerHTML = items + buttonHTML

  bindFinishEvent()
}

function bindFinishEvent() {
  document.getElementById('finish-btn').addEventListener('click', (e) => { switchTab('info') })

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = btn.closest('.section');
      const id = section.dataset.id;
      remove(id)
      initSummary()
    });
  });

}

window.initSummary = initSummary;