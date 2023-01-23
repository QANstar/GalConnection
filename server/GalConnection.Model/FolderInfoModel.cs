using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class FolderInfoModel
    {
        public long createTime { get; set; }
        public string name { get; set; }
        public int? pid { get; set; }
        public int groupId { get; set; }
        public int id { get; set; }
    }
}
