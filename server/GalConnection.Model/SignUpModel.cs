using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class SignUpModel
    {
        [Required]
        [StringLength(20)]
        public string nickname { get; set; }
        [Required]
        [StringLength(30)]
        public string password { get; set; }
        [Required]
        [StringLength(30)]
        public string email { get; set; }
    }
}
