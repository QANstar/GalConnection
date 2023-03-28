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
    public class CommentModel
    {
        public int? id { get; set; }
        public int gameId { get; set; }
        public int? userId { get; set; }
        public long? createTime { get; set; }
        public string commentContent { get; set; }

        public virtual User? user { get; set; }
    }
}
