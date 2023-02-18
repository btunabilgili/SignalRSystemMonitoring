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

        this._hubConnection = new HubConnectionBuilder()
            .withUrl('/SystemHealth')
            .build();

        this._hubConnection.on('testing', (message: string) => {
            console.log(message)
        });

        this._hubConnection.start().catch(err => console.error(err.toString()));
    }

    protected getTemplate() {
        return `<div>I am here</div>`;
    }
}