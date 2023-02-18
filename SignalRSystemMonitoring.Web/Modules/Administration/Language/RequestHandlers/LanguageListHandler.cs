using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<SignalRSystemMonitoring.Administration.LanguageRow>;
using MyRow = SignalRSystemMonitoring.Administration.LanguageRow;


namespace SignalRSystemMonitoring.Administration
{
    public interface ILanguageListHandler : IListHandler<MyRow, MyRequest, MyResponse> { }

    public class LanguageListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ILanguageListHandler
    {
        public LanguageListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}