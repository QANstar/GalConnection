using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Server.Services
{
    public class NotificationServices
    {
        readonly GalConnectionContext Context;
        public NotificationServices(GalConnectionContext context)
        {
            Context = context;
        }
        /// <summary>
        /// 发送通知
        /// </summary>
        /// <param name="notificationModel"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool SendNotification(NotificationModel notificationModel)
        {
            string notificationContent = "";
            if (notificationModel.notification1 != null)
            {
                notificationContent = notificationModel.notification1;
            }
            else
            {
                switch (notificationModel.type)
                {
                    case NotificationType.STAR:
                        notificationContent = NotificationContent.STARCONTENT;
                        break;
                    case NotificationType.LIKEGAME:
                        notificationContent = NotificationContent.LIKEGAMECONTENT;
                        break;
                    case NotificationType.FOLLOW:
                        notificationContent = NotificationContent.FOLLOWCONTENT;
                        break;
                    case NotificationType.REPLY:
                        notificationContent = NotificationContent.REPLYCONTENT;
                        break;
                    case NotificationType.COMMENT:
                        notificationContent = NotificationContent.COMMENTCONTENT;
                        break;
                    case NotificationType.LIKEREPLY:
                        notificationContent = NotificationContent.LIKEREPLYCONTENT;
                        break;
                    default: return false;
                }
            }
            Notification notification = new()
            {
                userId = notificationModel.userId,
                linkId = notificationModel.linkId,
                type = (int)notificationModel.type,
                notification1 = notificationContent,
                time = TimeUtils.GetNowTime(),
                sourceUserId = notificationModel.sourceUserId,
                isRead = false,
            };

            Context.Notification.Add(notification);
            Context.SaveChanges();

            return true;
        }
        /// <summary>
        /// 获取通知
        /// </summary>
        /// <param name="nextId"></param>
        /// <param name="userId"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public string GetNotifications(int nextId, int userId, int limit = 10)
        {
            List<Notification> notifications = Context.Notification.Include(x => x.sourceUser).OrderBy(x => x.time).Where(x => x.id > nextId && x.userId == userId).Take(limit).ToList();
            var res = new
            {
                notifications,
                hasNext = Context.Notification.OrderBy(x => x.time).Where(x => x.id > nextId && x.userId == userId).Count() > limit
            };
            return JsonUtils.ToJson(res);
        }
        /// <summary>
        /// 获取未读数量
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int GetUnReadNum(int userId)
        {
            int num = Context.Notification.Where(x => x.userId == userId && !x.isRead).Count();
            return num;
        }
        /// <summary>
        /// 设置已读
        /// </summary>
        /// <param name="notificationid"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool Read(int notificationid, int userId)
        {
            Notification notification = Context.Notification.FirstOrDefault(x => x.id == notificationid);
            if (notification == null)
            {
                throw new Exception("通知不存在");
            }
            if (userId != notification.userId)
            {
                throw new Exception("无权限");
            }
            notification.isRead = true;
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 全部已读
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool ReadAll(int userId)
        {
            Context.Notification.Where(x => x.userId == userId).ToList().ForEach(x =>
            {
                x.isRead = true;
            });
            Context.SaveChanges();

            return true;
        }
    }
}
