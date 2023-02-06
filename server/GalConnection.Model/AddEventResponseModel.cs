using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class AddEventResponseModel
    {
        public Event eventShow { get; set; }
        public EventsMap? edge { get; set; }
    }
}
