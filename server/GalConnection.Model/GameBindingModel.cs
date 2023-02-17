using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class GameBindingModel
    {
        public int? id { get; set; }
        public int gameId { get; set; }
        [Required]
        [StringLength(500)]
        public string name { get; set; }
        public int type { get; set; }
        public int folderId { get; set; }
        [StringLength(1000)]
        public string cover { get; set; }
    }
}
