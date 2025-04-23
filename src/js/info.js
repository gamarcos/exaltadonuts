import { labels } from "./data.js";
import { get, removeAll } from "./storage.js";

function hasOrder() {
    const summary = get('summary')
    return summary?.length > 0
}

function buildMessage() {
    const summary = sessionStorage.getItem('summary')
    const data = JSON.parse(summary)
    const infodata = `
        Nome: ${document.getElementById("name").value}
        Email: ${document.getElementById("email").value}
        Telefone: ${document.getElementById("phone").value}
        ------------------------------------------------------------

    `

    return infodata + data
        .map((item, index) => {
            const linhas = Object.entries(item)
                .map(([key, value]) => `• ${labels[key]}: ${value}`)
                .join('\n');
            return `Item ${index + 1}:\n${linhas}`;
        })
        .join('\n\n');
}

function onLoading(isLoading) {
    const button = document.getElementById('send-btn')
    const loader = document.getElementById('loader')
    
    var loadingClass = isLoading ? `fa fa-circle-o-notch fa-spin` : ``
    loader.classList = loadingClass
    button.disabled = isLoading
}

function showFeedBack(isSuccess) {
    var style = isSuccess ? 'success' : 'error'
    var snackbar = document.getElementById("snackbar");
    snackbar.className = `show ${style}`;
    snackbar.textContent = isSuccess ? 'Pedido realizado com sucesso!' : 'Ops! tivemos um problema. Tente novamente'
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function shouldSendOrder() {
    const isNameFilled = document.getElementById('name').value;
    const isEmailFilled = document.getElementById('email').value;
    const isPhoneFilled = document.getElementById('phone').value;
    return isNameFilled && isEmailFilled && isPhoneFilled && hasOrder()
}

export function send(callback) {
    if (!shouldSendOrder()) return

    onLoading(true)    

    const message = buildMessage();
    callback(
        {
            name: "Exaltadonuts",
            message: message
        },

        (isSuccess) => {
            onLoading(false)

            if (isSuccess) removeAll('summary')
            showFeedBack(isSuccess)
        }
    )
}

window.send = send;