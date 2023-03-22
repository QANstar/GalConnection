using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class ChatContentsModel
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int roomId { get; set; }
        public string words { get; set; }
        public long createTime { get; set; }

        public virtual UserSimpleInfoModel user { get; set; }
        public virtual ICollection<ChatContentStateModel> ChatContentState { get; set; }
    }
}
