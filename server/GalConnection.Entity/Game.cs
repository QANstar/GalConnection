﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class Game
    {
        [Key]
        public int id { get; set; }
        public int userId { get; set; }
        [StringLength(500)]
        public string tag { get; set; }
        [StringLength(1000)]
        public string cover { get; set; }
        [StringLength(1000)]
        public string homeBg { get; set; }
        [StringLength(1500)]
        public string preCG { get; set; }
        [StringLength(500)]
        public string langeuage { get; set; }
        [StringLength(1000)]
        public string introduce { get; set; }
        public int state { get; set; }
        [Required]
        [StringLength(50)]
        public string gameName { get; set; }
        public int groupId { get; set; }
    }
}