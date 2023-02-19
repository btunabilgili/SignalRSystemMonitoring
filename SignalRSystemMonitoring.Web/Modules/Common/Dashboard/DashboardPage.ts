import { TemplatedPanel } from "@serenity-is/corelib";
//import { ErrorHandling, isEmptyOrNull, notifyError, parseQueryString, resolveUrl, serviceCall, ServiceResponse, localText, htmlEncode } from "@serenity-is/corelib/q";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
$(function () {
    new DashboardPanel($('#dashboard-container'));


});

class DashboardPanel extends TemplatedPanel<any> {
    private _hubConnection: HubConnection;
    private _cpuChart;
    private _memoryChart;
    private _diskChart;
    constructor(container: JQuery) {
        super(container);

        this.element.append(`<div class="cpu"></div>`);
        this.element.append(`<div class="disk"></div>`);
        this.element.append(`<div class="total-memory"></div>`);
        this.element.append(`<div class="memory"></div>`);

        this._hubConnection = new HubConnectionBuilder()
            .withUrl('/SystemHealth')
            .build();

        var baseConfig = {
            type: 'gauge',
            data: {
                datasets: [{
                    data: [30, 50, 80, 100],
                    value: null,
                    backgroundColor: ['green', 'yellow', 'orange', 'red'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: ''
                },
                layout: {
                    padding: {
                        bottom: 30
                    }
                },
                needle: {
                    radiusPercentage: 2,
                    widthPercentage: 3.2,
                    lengthPercentage: 80,
                    color: 'rgba(0, 0, 0, 1)'
                },
                valueLabel: {
                    formatter: Math.round
                },
                plugins: {
                    datalabels: {
                        display: true,
                        formatter: function (value, context) {
                            return '< ' + Math.round(value);
                        },
                        color: function (context) {
                            return context.dataset.backgroundColor;
                        },
                        backgroundColor: 'rgba(0, 0, 0, 1.0)',
                        borderWidth: 0,
                        borderRadius: 5,
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }

        this._hubConnection.on('SystemMonitoring', (data) => {
            if (!this._cpuChart) {
                var cpuConfig = JSON.parse(JSON.stringify(baseConfig));
                cpuConfig.options.title.text = "CPU Usage (%)";
                cpuConfig.data.datasets[0].value = Math.round(data.cpu);

                // @ts-ignore
                var ctx = document.getElementById('cpu-chart').getContext('2d');
                // @ts-ignore
                this._cpuChart = new Chart(ctx, cpuConfig);
            }
            else {
                this._cpuChart.data.datasets.forEach(function (dataset) {
                    dataset.value = Math.round(data.cpu);
                });
                this._cpuChart.update();
            }

            if (!this._memoryChart) {
                var memoryConfig = JSON.parse(JSON.stringify(baseConfig));
                memoryConfig.data.datasets[0].data = [Math.round(data.totalMemory / 4), Math.round(data.totalMemory / 2), Math.round(data.totalMemory / 1.5), Math.round(data.totalMemory)];
                memoryConfig.options.title.text = "Memory Usage (GB)";
                memoryConfig.data.datasets[0].value = Math.round(data.usedMemory);

                // @ts-ignore
                var ctx = document.getElementById('memory-chart').getContext('2d');
                // @ts-ignore
                this._memoryChart = new Chart(ctx, memoryConfig);
            }
            else {
                this._memoryChart.data.datasets.forEach(function (dataset) {
                    dataset.value = Math.round(data.usedMemory);
                });
                this._memoryChart.update();
            }

            if (!this._diskChart) {
                var diskConfig = JSON.parse(JSON.stringify(baseConfig));
                diskConfig.options.title.text = "Disk Usage (%)";
                diskConfig.data.datasets[0].value = Math.round(data.disk);
                // @ts-ignore
                var ctx = document.getElementById('disk-chart').getContext('2d');
                // @ts-ignore
                this._diskChart = new Chart(ctx, diskConfig);
            }
            else {
                this._diskChart.data.datasets.forEach(function (dataset) {
                    dataset.value = Math.round(data.disk);
                });
                this._diskChart.update();
            }
        });

        this._hubConnection.start().catch(err => console.error(err.toString()));
    }

    protected getTemplate() {
        return `
                <div class="row">
                    <div class="col-lg-3">
                        <canvas id="cpu-chart"></canvas>
                    </div>
                    <div class="col-lg-3">
                        <canvas id="memory-chart"></canvas>
                    </div>
                     <div class="col-lg-3">
                        <canvas id="disk-chart"></canvas>
                    </div>
                </div>`;
    }
}