using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Serenity.Abstractions;
using System;
using System.Threading.Tasks;

namespace SignalRSystemMonitoring.Administration
{
    /// <summary>
    /// Authorizes access to a system monitoring hub.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class SystemMonitorAuthorize : Attribute, IHubFilter
    {
        public Task OnConnectedAsync(HubLifetimeContext context, Func<HubLifetimeContext, Task> next)
        {
            var hasPermission = context.ServiceProvider.GetRequiredService<IPermissionService>().HasPermission(PermissionKeys.SystemMonitoring);

            if (!hasPermission)
                throw new UnauthorizedAccessException();

            return next(context);
        }
    }
}
