﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    [Keyless]
    public partial class View_Group
    {
        public int groupId { get; set; }
        public int userId { get; set; }
        public int role { get; set; }
        public long joinTime { get; set; }
        public int type { get; set; }
        public long createTime { get; set; }
        [Required]
        [StringLength(50)]
        public string name { get; set; }
    }
}