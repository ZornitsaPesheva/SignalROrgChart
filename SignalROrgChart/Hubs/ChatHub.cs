using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendData(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveData", user, message);
        }
    }
}