using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class NotificationModel
    {
        public int? linkId { get; set; }
        public NotificationType type { get; set; }
        public string? notification1 { get; set; }
        public int sourceUserId { get; set; }
        public int userId { get; set; }
    }
}
