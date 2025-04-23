export function switchTab(id) {
    document.getElementById('order-view').style.display = id === 'order' ? 'block' : 'none'
    document.getElementById('summary-view').style.display = id === 'summary' ? 'block' : 'none'
    document.getElementById('info-view').style.display = id === 'info' ? 'block' : 'none'

    var tabs = document.querySelector('.tabs');

    [...tabs.children].forEach(element => {
        element.classList.remove('active')
        if (element.id == id) element.classList.add('active')
    })
}

export function bindNavigation(callback) {
    document.querySelector('.tabs').addEventListener('click', (e) => {
        const tab = e.target.closest('.tab');
        if (tab) switchTab(tab.id);
        callback(tab.id)
    });
}

window.bindNavigation = bindNavigation;