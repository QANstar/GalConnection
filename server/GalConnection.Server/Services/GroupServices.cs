using GalConnection.Entity;

namespace GalConnection.Server.Services
{
    public class GroupServices
    {
        readonly GalConnectionContext Context;
        public GroupServices(GalConnectionContext context)
        {
            Context = context;
        }

        /// <summary>
        /// 检查权限
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userId"></param>
        /// <param name="needRole"></param>
        /// <returns></returns>
        public bool CheckRole(int groupId, int userId, int needRole)
        {
            UserGroup userGroup = Context.UserGroup.FirstOrDefault(x => x.groupId == groupId && x.userId == userId);
            if (userGroup == null)
            {
                return false;
            }
            else
            {
                if (userGroup.role <= needRole)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
