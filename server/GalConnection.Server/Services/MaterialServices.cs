using GalConnection.Entity;

namespace GalConnection.Server.Services
{
    public class MaterialServices
    {
        readonly GalConnectionContext Context;
        public MaterialServices(GalConnectionContext context)
        {
            Context = context;
        }

    }
}
