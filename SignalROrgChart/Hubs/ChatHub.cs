using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendData(string id, string pid)
        {
            await Clients.All.SendAsync("ReceiveData", id, pid);
        }
    }
}