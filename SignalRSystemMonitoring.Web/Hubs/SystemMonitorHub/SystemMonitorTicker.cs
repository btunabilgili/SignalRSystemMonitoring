using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SignalRSystemMonitoring.Hubs
{
    public interface ISystemMonitorTicker
    {
        void CancelTask();
        Task SendSystemMonitoringData();
    }

    public class SystemMonitorTicker : ISystemMonitorTicker
    {
        private readonly IHubContext<SystemMonitorHub> _hubContext;
        private CancellationTokenSource cancellationTokenSource;
        private CancellationToken cancellationToken;

        public SystemMonitorTicker(IHubContext<SystemMonitorHub> hubContext)
        {
            _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
        }

        public async Task SendSystemMonitoringData()
        {
            cancellationTokenSource = new CancellationTokenSource();
            cancellationToken = cancellationTokenSource.Token;

            while (!cancellationToken.IsCancellationRequested)
            {
                await _hubContext.Clients.All.SendAsync("Testing for the first time!", cancellationToken);

                await Task.Delay(2000, cancellationToken);
            }
        }

        public void CancelTask()
        {
            cancellationTokenSource.Cancel();
            cancellationTokenSource.Dispose();
        }
    }
}
