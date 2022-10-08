using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class CreateEventModel
    {
        public int gameId { get; set; }
        [Required]
        [StringLength(150)]
        public string eventName { get; set; }
        public int pid { get; set; }
        public int endType { get; set; }
        [StringLength(250)]
        public string enterCondition { get; set; }
    }
}
