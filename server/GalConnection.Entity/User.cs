﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Entity
{
    public partial class User
    {
        public User()
        {
            ChatContent = new HashSet<ChatContent>();
            ChatContentState = new HashSet<ChatContentState>();
            ChatRoomUsers = new HashSet<ChatRoomUsers>();
            FollowfollowUser = new HashSet<Follow>();
            Followuser = new HashSet<Follow>();
            Game = new HashSet<Game>();
            Notification = new HashSet<Notification>();
        }

        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string email { get; set; }
        [Required]
        [StringLength(50)]
        public string password { get; set; }
        [Required]
        [StringLength(50)]
        public string nickname { get; set; }
        [Required]
        [StringLength(1000)]
        public string avatar { get; set; }
        [Required]
        [StringLength(300)]
        public string introduce { get; set; }
        [Required]
        [StringLength(1000)]
        public string banner { get; set; }
        public long createdAt { get; set; }

        [InverseProperty("user")]
        public virtual ICollection<ChatContent> ChatContent { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<ChatContentState> ChatContentState { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<ChatRoomUsers> ChatRoomUsers { get; set; }
        [InverseProperty("followUser")]
        public virtual ICollection<Follow> FollowfollowUser { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<Follow> Followuser { get; set; }
        [InverseProperty("user")]
        public virtual ICollection<Game> Game { get; set; }
        [InverseProperty("sourceUser")]
        public virtual ICollection<Notification> Notification { get; set; }
    }
}