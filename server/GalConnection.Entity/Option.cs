﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class Option
    {
        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(150)]
        public string optionContent { get; set; }
        public int eventId { get; set; }
        public int selectNum { get; set; }
    }
}