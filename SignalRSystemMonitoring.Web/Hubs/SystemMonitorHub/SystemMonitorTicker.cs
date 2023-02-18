using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
using System.Linq;
using System.Management;
using System.Runtime.InteropServices;
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

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                var cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
                var memoryCounter = new PerformanceCounter("Memory", "Available MBytes");
                var diskCounter = new PerformanceCounter("PhysicalDisk", "% Disk Time", "_Total"); ;

                ObjectQuery wql = new("SELECT * FROM Win32_OperatingSystem");
                ManagementObjectSearcher searcher = new(wql);
                var results = searcher.Get().Cast<ManagementObject>();
                var totalMemory = Convert.ToDouble(results.FirstOrDefault()?["TotalVisibleMemorySize"]) / (1024 * 1024);

                while (!cancellationToken.IsCancellationRequested)
                {
                    cpuCounter.NextValue();
                    memoryCounter.NextValue();
                    diskCounter.NextValue();

                    await Task.Delay(1000, cancellationToken);

                    await _hubContext.Clients.All.SendAsync("testing", new
                    {
                        cpu = cpuCounter.NextValue(),
                        totalMemory,
                        usedMemory = totalMemory - (memoryCounter.NextValue() / 1024),
                        disk = diskCounter.NextValue().ToString("0.##")
                    },cancellationToken);

                    await Task.Delay(1000, cancellationToken);
                }
            }
        }

        public void CancelTask()
        {
            cancellationTokenSource.Cancel();
            cancellationTokenSource.Dispose();
        }
    }
}
