using GalConnection.Entity;

namespace GalConnection.Server.Services
{
    public class GameServices
    {
        readonly GalConnectionContext Context;
        public GameServices(GalConnectionContext context)
        {
            Context = context;
        }

    }
}
