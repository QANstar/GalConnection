﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class LinesBackground
    {
        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(500)]
        public string background { get; set; }
        [Required]
        [StringLength(1000)]
        public string style { get; set; }
        public int? materialId { get; set; }
        public int? bindingId { get; set; }
        public bool isCG { get; set; }

        [ForeignKey("id")]
        [InverseProperty("LinesBackground")]
        public virtual Lines idNavigation { get; set; }
    }
}