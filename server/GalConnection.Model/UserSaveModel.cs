using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class UserSaveModel
    {
        [Key]
        public int? id { get; set; }
        public long? saveTime { get; set; }
        [StringLength(1000)]
        public string img { get; set; }
        [StringLength(1000)]
        public string eventName { get; set; }
        [StringLength(1000)]
        public string linesContent { get; set; }
        public int linesId { get; set; }
        [StringLength(2000)]
        public string choOptions { get; set; }
        public int saveIndex { get; set; }
        public int gameId { get; set; }
        public int userId { get; set; }
    }
}
