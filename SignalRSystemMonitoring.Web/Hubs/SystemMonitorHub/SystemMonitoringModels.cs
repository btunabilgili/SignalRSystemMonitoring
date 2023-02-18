using Serenity.Services;

namespace SignalRSystemMonitoring.Hubs
{
    public class SystemStatusResponse : ServiceResponse
    {
        public StatusItem CpuStatus { get; set; }
        public StatusItem MemoryStatus { get; set; }
    }

    public class StatusItem
    {
        public string Type { get; set; }
        public decimal Usage { get; set; }
    }
}
