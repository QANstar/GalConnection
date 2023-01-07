using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class CreateFloderModel
    {
        [Required]
        [StringLength(500)]
        public string name { get; set; }
        [Required]
        [StringLength(50)]
        public string type { get; set; }
        public int pid { get; set; }
        public int groupId { get; set; }
    }
}
