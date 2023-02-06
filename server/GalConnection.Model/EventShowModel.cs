using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class EventShowModel
    {
        public List<Event> events { get; set; }
        public List<EventsMap> edges { get; set; }
    }
}
