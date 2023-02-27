using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class OptionModel
    {
        public int? id { get; set; }
        public string optionContent { get; set; }
        public int eventId { get; set; }
        public int? selectNum { get; set; }
        public int? gameId { get; set; }
    }
}
