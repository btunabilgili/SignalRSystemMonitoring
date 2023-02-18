import { TemplatedPanel } from "@serenity-is/corelib";
//import { ErrorHandling, isEmptyOrNull, notifyError, parseQueryString, resolveUrl, serviceCall, ServiceResponse, localText, htmlEncode } from "@serenity-is/corelib/q";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"

$(function () {
    new DashboardPanel($('#dashboard-container'));
});

class DashboardPanel extends TemplatedPanel<any> {
    private _hubConnection: HubConnection;

    constructor(container: JQuery) {
        super(container);

        this.element.append(`<div class="cpu"></div>`);
        this.element.append(`<div class="total-memory"></div>`);
        this.element.append(`<div class="memory"></div>`);

        this._hubConnection = new HubConnectionBuilder()
            .withUrl('/SystemHealth')
            .build();

        this._hubConnection.on('testing', (data) => {
            this.element.find(".cpu").html("CPU: " + data.cpu);
            this.element.find(".total-memory").html("Total Memory: " + data.totalMemory);
            this.element.find(".memory").html("Memory: " + data.memory);
        });

        this._hubConnection.start().catch(err => console.error(err.toString()));
    }

    protected getTemplate() {
        return `<div>I am here</div>`;
    }
}