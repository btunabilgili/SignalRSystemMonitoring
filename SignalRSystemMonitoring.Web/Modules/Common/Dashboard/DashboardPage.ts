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

        this._hubConnection.on('testing', (data) => {
            if (!this._cpuChart) {
                // @ts-ignore
                var ctx = document.getElementById('cpu-chart').getContext('2d');
                // @ts-ignore
                this._cpuChart = new Chart(ctx, {
                    type: 'gauge',
                    data: {
                        //labels: ['Success', 'Warning', 'Warning', 'Error'],
                        datasets: [{
                            data: [30, 50, 80, 100],
                            value: Math.round(data.cpu),
                            backgroundColor: ['green', 'yellow', 'orange', 'red'],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'CPU Usage (%)'
                        },
                        layout: {
                            padding: {
                                bottom: 30
                            }
                        },
                        needle: {
                            // Needle circle radius as the percentage of the chart area width
                            radiusPercentage: 2,
                            // Needle width as the percentage of the chart area width
                            widthPercentage: 3.2,
                            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
                            lengthPercentage: 80,
                            // The color of the needle
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
                                //color: 'rgba(255, 255, 255, 1.0)',
                                backgroundColor: 'rgba(0, 0, 0, 1.0)',
                                borderWidth: 0,
                                borderRadius: 5,
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                });
            }
            else {
                this._cpuChart.data.datasets.forEach(function (dataset) {
                    dataset.value = Math.round(data.cpu);
                });
                this._cpuChart.update();
            }

            if (!this._memoryChart) {
                // @ts-ignore
                var ctx = document.getElementById('memory-chart').getContext('2d');
                // @ts-ignore
                this._memoryChart = new Chart(ctx, {
                    type: 'gauge',
                    data: {
                        //labels: ['Success', 'Warning', 'Warning', 'Error'],
                        datasets: [{
                            data: [data.totalMemory/4, data.totalMemory/2, data.totalMemory/1.5, data.totalMemory],
                            value: Math.round(data.usedMemory),
                            backgroundColor: ['green', 'yellow', 'orange', 'red'],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Memory Usage (GB)'
                        },
                        layout: {
                            padding: {
                                bottom: 30
                            }
                        },
                        needle: {
                            // Needle circle radius as the percentage of the chart area width
                            radiusPercentage: 2,
                            // Needle width as the percentage of the chart area width
                            widthPercentage: 3.2,
                            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
                            lengthPercentage: 80,
                            // The color of the needle
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
                                //color: 'rgba(255, 255, 255, 1.0)',
                                backgroundColor: 'rgba(0, 0, 0, 1.0)',
                                borderWidth: 0,
                                borderRadius: 5,
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                });
            }
            else {
                this._memoryChart.data.datasets.forEach(function (dataset) {
                    dataset.value = Math.round(data.usedMemory);
                });
                this._memoryChart.update();
            }

            if (!this._diskChart) {
                // @ts-ignore
                var ctx = document.getElementById('disk-chart').getContext('2d');
                // @ts-ignore
                this._diskChart = new Chart(ctx, {
                    type: 'gauge',
                    data: {
                        //labels: ['Success', 'Warning', 'Warning', 'Error'],
                        datasets: [{
                            data: [30, 50, 80, 100],
                            value: Math.round(data.disk),
                            backgroundColor: ['green', 'yellow', 'orange', 'red'],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Disk Usage (%)'
                        },
                        layout: {
                            padding: {
                                bottom: 30
                            }
                        },
                        needle: {
                            // Needle circle radius as the percentage of the chart area width
                            radiusPercentage: 2,
                            // Needle width as the percentage of the chart area width
                            widthPercentage: 3.2,
                            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
                            lengthPercentage: 80,
                            // The color of the needle
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
                                //color: 'rgba(255, 255, 255, 1.0)',
                                backgroundColor: 'rgba(0, 0, 0, 1.0)',
                                borderWidth: 0,
                                borderRadius: 5,
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                });
            }
            else {
                this._diskChart.data.datasets.forEach(function (dataset) {
                    dataset.value = Math.round(data.disk);
                });
                this._diskChart.update();
            }
            this.element.find(".cpu").html("CPU: " + data.cpu);
            this.element.find(".disk").html("Disk: " + data.disk);
            this.element.find(".total-memory").html("Total Memory: " + data.totalMemory);
            this.element.find(".memory").html("Memory: " + data.usedMemory);
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