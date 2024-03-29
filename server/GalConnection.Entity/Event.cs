﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class Event
    {
        [Key]
        public int id { get; set; }
        public int gameId { get; set; }
        [Required]
        [StringLength(150)]
        public string eventName { get; set; }
        public int endType { get; set; }
        [StringLength(250)]
        public string enterCondition { get; set; }
        public bool isStartEvent { get; set; }
        public int state { get; set; }
        public int? groupId { get; set; }
        [StringLength(500)]
        public string video { get; set; }

        [InverseProperty("_event")]
        public virtual EventTreeViewData EventTreeViewData { get; set; }
    }
}