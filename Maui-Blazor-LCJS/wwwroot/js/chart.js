// JavaScript interface that is called from .NET to interact with JavaScript based LightningChart

const instances = []

/**
 * containerId = id of DOM <div> that will house the chart.
 * The <div> is intented to be created using Razor.
 **/
window.createChart = (containerId) => {
    console.log('createChart', containerId)
    const container = document.getElementById(containerId)
    if (!container) {
        console.error(`wwwroot/js/chart.js createChart container not found in DOM: "${containerId}"`)
        return
    }
    const { lightningChart, Themes, AxisScrollStrategies } = lcjs
    const chart = lightningChart().ChartXY({ container, theme: Themes.light })
    const axisX = chart.getDefaultAxisX().setScrollStrategy(AxisScrollStrategies.progressive).setInterval({ start: 0, end: 100, stopAxisAfter: false })
    const lineSeries = chart.addLineSeries({ dataPattern: { pattern: 'ProgressiveX' } })
    const legend = chart.addLegendBox().add(chart)
    instances.push({ containerId, chart, lineSeries })
}


// Data transfer (.NET -> JS) example: Invoke JS with stringified JSON.
window.setChartData = (containerId, data) => {
    console.log('setChartData', containerId, data)
    const instance = instances.find(item => item.containerId === containerId)
    if (!instance) {
        console.error(`wwwroot/js/chart.js setChartData instance not found: "${containerId}"`)
        return
    }
    const { lineSeries } = instance
    const dataParsed = JSON.parse(data)
    lineSeries.add(dataParsed)
}
