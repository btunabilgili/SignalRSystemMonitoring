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

                ObjectQuery wql = new("SELECT * FROM Win32_OperatingSystem");
                ManagementObjectSearcher searcher = new(wql);
                var results = searcher.Get().Cast<ManagementObject>();

                ManagementObjectSearcher cpuSearch = new ManagementObjectSearcher(@"\root\CIMV2",
                    "SELECT * FROM Win32_PerfFormattedData_PerfOS_Processor WHERE Name=\"_Total\"");
                ManagementObjectCollection moc = cpuSearch.Get();
                //ManagementObject mo = moc.Cast<managementobject>().First();
                //string cpu = mo["PercentIdleTime"].ToString();

                while (!cancellationToken.IsCancellationRequested)
                {
                    cpuCounter.NextValue();
                    memoryCounter.NextValue();

                    await Task.Delay(1000, cancellationToken);

                    await _hubContext.Clients.All.SendAsync("testing", new { cpu = cpuCounter.NextValue(), totalMemory = (Convert.ToDouble(results.FirstOrDefault()?["TotalVisibleMemorySize"]) / (1024 * 1024)).ToString("0.##"), memory = (memoryCounter.NextValue() / 1000).ToString("0.##") }, cancellationToken);

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
