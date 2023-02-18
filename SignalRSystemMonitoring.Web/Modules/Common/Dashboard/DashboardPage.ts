import { TemplatedPanel } from "@serenity-is/corelib";
//import { ErrorHandling, isEmptyOrNull, notifyError, parseQueryString, resolveUrl, serviceCall, ServiceResponse, localText, htmlEncode } from "@serenity-is/corelib/q";

$(function () {
    new DashboardPanel($('#dashboard-container'));
});

class DashboardPanel extends TemplatedPanel<any> {
    constructor(container: JQuery) {
        super(container);

        alert("worked");
    }

    protected getTemplate() {
        return `<div>I am here</div>`;
    }
}