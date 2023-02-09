using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class EventEditModel
    {
        public int id { get; set; }
        public string eventName { get; set; }
        public int endType { get; set; }
        public int[] enterCondition { get; set; }
    }
}
