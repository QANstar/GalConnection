using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class UserSimpleInfoModel
    {
        public int id { get; set; }
        public string nickname { get; set; }
        public string email { get; set; }
        public string avatar { get; set; }
        public string introduce { get; set; }
        public string banner { get; set; }
        public long createdAt { get; set; }
    }
}
