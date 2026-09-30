const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select") // Moeda de DESTINO
const currencyOptions = document.querySelector(".currency-options") // Moeda de ORIGEM

// Centraliza todas as cotações tendo o REAL (BRL) como valor 1
const exchangeRates = {
    real: 1,
    dolar: 5.2,
    euro: 6.2,
    libra: 6.6,
    btc: 500000
}

// Configurações de formatação de cada moeda para a tela
const currencyConfig = {
    real: { name: "Real", locale: "pt-BR", currency: "BRL", img: "./img/real.png" },
    dolar: { name: "Dólar", locale: "en-US", currency: "USD", img: "./img/dolar.png" },
    euro: { name: "Euro", locale: "de-DE", currency: "EUR", img: "./img/euro.png" },
    libra: { name: "Libra", locale: "en-GB", currency: "GBP", img: "./img/libra.png" },
    btc: { name: "Bitcoin", locale: "pt-BR", currency: "BTC", img: "./img/bitcoin.png", fraction: 8 }
}

function clickButton() {
    const inputValue = Number(document.querySelector(".input-value").value)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value")

    const fromCurrency = currencyOptions.value // Origem (Ex: euro)
    const toCurrency = currencySelect.value    // Destino (Ex: dolar)

    // FÓRMULA UNIVERSAL: Converte a origem para Real, e depois o Real para o destino
    const valueInReal = inputValue * exchangeRates[fromCurrency]
    const finalValue = valueInReal / exchangeRates[toCurrency]

    // Formata e exibe o valor de DESTINO
    const configTo = currencyConfig[toCurrency]
    currencyValueConverted.innerHTML = new Intl.NumberFormat(configTo.locale, {
        style: "currency",
        currency: configTo.currency,
        maximumFractionDigits: configTo.fraction || 2
    }).format(finalValue)

    // Formata e exibe o valor de ORIGEM
    const configFrom = currencyConfig[fromCurrency]
    currencyValueToConvert.innerHTML = new Intl.NumberFormat(configFrom.locale, {
        style: "currency",
        currency: configFrom.currency,
        maximumFractionDigits: configFrom.fraction || 2
    }).format(inputValue)
}

// Função para atualizar o nome e a imagem da moeda de DESTINO na tela
function updateLayout() {
    const currencyName = document.querySelector(".currency-name")
    const currencyImg = document.querySelector(".currency-img")
    const config = currencyConfig[currencySelect.value]

    if (config) {
        currencyName.innerHTML = config.name
        currencyImg.src = config.img
    }
    clickButton()
}

// Eventos do código
convertButton.addEventListener("click", clickButton)
currencySelect.addEventListener("change", updateLayout)
currencyOptions.addEventListener("change", clickButton) // Recalcula se mudar a moeda de origem