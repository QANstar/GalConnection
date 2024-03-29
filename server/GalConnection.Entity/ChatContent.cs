﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class ChatContent
    {
        public ChatContent()
        {
            ChatContentState = new HashSet<ChatContentState>();
        }

        [Key]
        public int id { get; set; }
        public int userId { get; set; }
        public int roomId { get; set; }
        [Required]
        [StringLength(1000)]
        public string words { get; set; }
        public long createTime { get; set; }

        [ForeignKey("userId")]
        [InverseProperty("ChatContent")]
        public virtual User user { get; set; }
        [InverseProperty("chatContent")]
        public virtual ICollection<ChatContentState> ChatContentState { get; set; }
    }
}