using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class ChatAddModel
    {
        public int roomId { get; set; }
        public string words { get; set; }
    }
}
