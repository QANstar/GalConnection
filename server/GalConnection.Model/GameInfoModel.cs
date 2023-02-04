using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class GameInfoModel
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string gameName { get; set; }
        public string[] tag { get; set; }
        public string cover { get; set; }
        public string homeBg { get; set; }
        public string[] preCG { get; set; }
        public string[] langeuage { get; set; }
        public string introduce { get; set; }
    }
}
