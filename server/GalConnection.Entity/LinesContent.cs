﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class LinesContent
    {
        [Key]
        public int id { get; set; }
        public int linesId { get; set; }
        [Column("linesContent")]
        [StringLength(200)]
        public string linesContent1 { get; set; }
        [StringLength(200)]
        public string characters { get; set; }
        [StringLength(200)]
        public string language { get; set; }
    }
}