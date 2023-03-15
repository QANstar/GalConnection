using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class GameInfoModel
    {
        public int id { get; set; }
        public int groupId { get; set; }
        public int userId { get; set; }
        public string gameName { get; set; }
        public string cover { get; set; }
        public string homeBg { get; set; }
        public string[] preCG { get; set; }
        public string[] langeuage { get; set; }
        public string[] voiceLangeuage { get; set; }
        public string introduce { get; set; }
        public int state { get; set; }
        public long createdAt { get; set; }
        public int starNum { get; set; }
        public int playNum { get; set; }
        public int likeNum { get; set; }
        public bool isStar { get; set; }
        public bool isLike { get; set; }
        public virtual ICollection<Tag> Tag { get; set; }
    }
}
