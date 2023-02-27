using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class GamePlayModel
    {
        public List<Event> events { get; set; }
        public List<EventsMap> edges { get; set; }
        public List<Lines> lines { get; set; }
        public List<Option> options { get; set; }
    }
}
