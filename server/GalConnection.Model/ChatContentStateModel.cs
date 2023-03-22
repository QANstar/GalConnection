using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class ChatContentStateModel
    {
        public int id { get; set; }
        public int userId { get; set; }
        public bool isRead { get; set; }
    }
}
