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
    public class CreateLinesModel
    {
        public class LinesContentCreateModel
        {
            public string linesContent1 { get; set; }
            [StringLength(200)]
            public string characters { get; set; }
            [StringLength(200)]
            public string language { get; set; }
        }
        public class LinesVoiceCreateModel
        {
            public string voice { get; set; }
            [StringLength(1000)]
            public string language { get; set; }
        }
        public class LinesCharaCreateModel
        {
            public string charaPics { get; set; }
            public string charaStyle { get; set; }
        }
        public int? id { get; set; }
        public int? gameId { get; set; }
        public int eventId { get; set; }
        [StringLength(1000)]
        public string background { get; set; }
        [StringLength(1000)]
        public string backgroundStyle { get; set; }
        [StringLength(1000)]
        public string bgm { get; set; }
        public int? next { get; set; }
        public int? pre { get; set; }

        public virtual ICollection<LinesContentCreateModel> LinesContent { get; set; }
        public virtual ICollection<LinesVoiceCreateModel> LinesVoice { get; set; }
        public virtual ICollection<LinesCharaCreateModel> LinesChara { get; set; }
    }
}
