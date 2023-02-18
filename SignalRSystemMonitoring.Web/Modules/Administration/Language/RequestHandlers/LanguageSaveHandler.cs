using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<SignalRSystemMonitoring.Administration.LanguageRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = SignalRSystemMonitoring.Administration.LanguageRow;


namespace SignalRSystemMonitoring.Administration
{
    public interface ILanguageSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> { }
    public class LanguageSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ILanguageSaveHandler
    {
        public LanguageSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}