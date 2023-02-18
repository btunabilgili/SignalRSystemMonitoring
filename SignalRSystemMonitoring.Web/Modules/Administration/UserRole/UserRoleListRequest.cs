using Serenity.Services;

namespace SignalRSystemMonitoring.Administration
{
    public class UserRoleListRequest : ServiceRequest
    {
        public int? UserID { get; set; }
    }
}