using Serenity.Services;

namespace SignalRSystemMonitoring.Membership
{
    public class SignUpResponse : ServiceResponse
    {
        public string DemoActivationLink { get; set; }
    }
}