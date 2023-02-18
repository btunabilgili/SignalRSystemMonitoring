using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRSystemMonitoring.Hubs
{
    public class SystemMonitorHub : Hub
    {
        private static readonly HashSet<string> _userConnectionIds = new HashSet<string>();
        private static bool _started = false;
        private readonly ISystemMonitorTicker _systemMonitorTicker;
        public SystemMonitorHub(ISystemMonitorTicker systemMonitorTicker)
        {
            _systemMonitorTicker = systemMonitorTicker ?? throw new ArgumentNullException(nameof(systemMonitorTicker));
        }

        public override Task OnConnectedAsync()
        {
            _userConnectionIds.Add(Context.ConnectionId);

            if (!_started)
            {
                _started = true;
                _systemMonitorTicker.SendSystemMonitoringData();
            }

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            lock (_userConnectionIds)
            {
                _userConnectionIds.Remove(Context.ConnectionId);
                if (!_userConnectionIds.Any())
                {
                    _systemMonitorTicker.CancelTask();
                    _started = false;
                }
            }

            return base.OnDisconnectedAsync(exception);
        }
    }
}
