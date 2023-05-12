using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class EventAddModel
    {
        public class EventTreeViewDataAddModel
        {
            public string position { get; set; }
        }
        public int gameId { get; set; }
        public string eventName { get; set; }
        public string? video { get; set; }
        public EventTreeViewDataAddModel eventTreeViewData { get; set; }
        public bool? isStartEvent { get; set; }
        public EdgeAddModel? edge { get; set; }
    }
}
