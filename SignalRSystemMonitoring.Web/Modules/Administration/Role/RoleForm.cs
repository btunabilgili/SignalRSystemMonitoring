using Serenity.ComponentModel;
using System;

namespace SignalRSystemMonitoring.Administration.Forms
{
    [FormScript("Administration.Role")]
    [BasedOnRow(typeof(RoleRow), CheckNames = true)]
    public class RoleForm
    {
        public String RoleName { get; set; }
    }
}