﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class LinesChara
    {
        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(1000)]
        public string charaPics { get; set; }
        [Required]
        [StringLength(1000)]
        public string charaStyle { get; set; }
        public int linesId { get; set; }

        [ForeignKey("linesId")]
        [InverseProperty("LinesChara")]
        public virtual Lines lines { get; set; }
    }
}