using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class UserShowModel
    {
        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(20)]
        public string nickname { get; set; }
        [Required]
        [StringLength(30)]
        public string email { get; set; }
        public string avatar { get; set; }
        public string banner { get; set; }
        public string introduce { get; set; }
        public long createdAt { get; set; }
        public int groupId { get; set; }
    }
}
