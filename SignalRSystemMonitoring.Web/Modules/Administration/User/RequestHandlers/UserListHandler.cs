using Serenity.Services;
using MyRequest = SignalRSystemMonitoring.Administration.UserListRequest;
using MyResponse = Serenity.Services.ListResponse<SignalRSystemMonitoring.Administration.UserRow>;
using MyRow = SignalRSystemMonitoring.Administration.UserRow;

namespace SignalRSystemMonitoring.Administration
{
    public interface IUserListHandler : IListHandler<MyRow, MyRequest, MyResponse> { }

    public class UserListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IUserListHandler
    {
        public UserListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}