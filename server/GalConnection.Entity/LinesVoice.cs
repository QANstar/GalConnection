﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class LinesVoice
    {
        [Key]
        public int id { get; set; }
        [StringLength(1000)]
        public string voice { get; set; }
        [StringLength(1000)]
        public string language { get; set; }
        public int linesId { get; set; }

        [ForeignKey("linesId")]
        [InverseProperty("LinesVoice")]
        public virtual Lines lines { get; set; }
    }
}