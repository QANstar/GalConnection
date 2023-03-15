using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class GameUserViewModel : Game
    {
        public GameUserViewModel()
        {
            isStar = false;
            isLike = false;
        }
        public bool isStar { get; set; }
        public bool isLike { get; set; }
    }
}
