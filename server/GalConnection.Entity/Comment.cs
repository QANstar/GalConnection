﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class Comment
    {
        [Key]
        public int id { get; set; }
        public int gameId { get; set; }
        public int userId { get; set; }
        public long createTime { get; set; }
        [Required]
        [StringLength(1000)]
        public string commentContent { get; set; }

        [ForeignKey("userId")]
        [InverseProperty("Comment")]
        public virtual User user { get; set; }
    }
}