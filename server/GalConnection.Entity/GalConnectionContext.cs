﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GalConnection.Entity
{
    public partial class GalConnectionContext : DbContext
    {
        public GalConnectionContext()
        {
        }

        public GalConnectionContext(DbContextOptions<GalConnectionContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChatContent> ChatContent { get; set; }
        public virtual DbSet<ChatContentState> ChatContentState { get; set; }
        public virtual DbSet<ChatRoom> ChatRoom { get; set; }
        public virtual DbSet<ChatRoomUsers> ChatRoomUsers { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<EventTreeViewData> EventTreeViewData { get; set; }
        public virtual DbSet<EventsMap> EventsMap { get; set; }
        public virtual DbSet<Follow> Follow { get; set; }
        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<GameBinding> GameBinding { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<Like> Like { get; set; }
        public virtual DbSet<Lines> Lines { get; set; }
        public virtual DbSet<LinesBackground> LinesBackground { get; set; }
        public virtual DbSet<LinesBgm> LinesBgm { get; set; }
        public virtual DbSet<LinesChara> LinesChara { get; set; }
        public virtual DbSet<LinesContent> LinesContent { get; set; }
        public virtual DbSet<LinesVoice> LinesVoice { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<MaterialFile> MaterialFile { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<Option> Option { get; set; }
        public virtual DbSet<Star> Star { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserGroup> UserGroup { get; set; }
        public virtual DbSet<UserPlayedGame> UserPlayedGame { get; set; }
        public virtual DbSet<UserSave> UserSave { get; set; }
        public virtual DbSet<View_Group> View_Group { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChatContent>(entity =>
            {
                entity.HasOne(d => d.user)
                    .WithMany(p => p.ChatContent)
                    .HasForeignKey(d => d.userId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatContent_User");
            });

            modelBuilder.Entity<ChatContentState>(entity =>
            {
                entity.HasOne(d => d.chatContent)
                    .WithMany(p => p.ChatContentState)
                    .HasForeignKey(d => d.chatContentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatContentState_ChatContent");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.ChatContentState)
                    .HasForeignKey(d => d.userId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatContentState_User");
            });

            modelBuilder.Entity<ChatRoomUsers>(entity =>
            {
                entity.HasOne(d => d.room)
                    .WithMany(p => p.ChatRoomUsers)
                    .HasForeignKey(d => d.roomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatRoomUsers_ChatRoom");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.ChatRoomUsers)
                    .HasForeignKey(d => d.userId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatRoomUsers_User");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasOne(d => d.user)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.userId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<EventTreeViewData>(entity =>
            {
                entity.Property(e => e.eventid).ValueGeneratedNever();

                entity.HasOne(d => d._event)
                    .WithOne(p => p.EventTreeViewData)
                    .HasForeignKey<EventTreeViewData>(d => d.eventid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventTreeViewData_Event");
            });

            modelBuilder.Entity<Follow>(entity =>
            {
                entity.HasOne(d => d.followUser)
                    .WithMany(p => p.FollowfollowUser)
                    .HasForeignKey(d => d.followUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fans");

                entity.HasOne(d => d.user)
                    .WithMany(p => p.Followuser)
                    .HasForeignKey(d => d.userId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FollowUsers");
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasOne(d => d.user)
                    .WithMany(p => p.Game)
                    .HasForeignKey(d => d.userId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Game_User");
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasOne(d => d.game)
                    .WithMany(p => p.Like)
                    .HasForeignKey(d => d.gameId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Like_Game");
            });

            modelBuilder.Entity<LinesBackground>(entity =>
            {
                entity.Property(e => e.id).ValueGeneratedNever();

                entity.HasOne(d => d.idNavigation)
                    .WithOne(p => p.LinesBackground)
                    .HasForeignKey<LinesBackground>(d => d.id)
                    .HasConstraintName("FK_LinesBackground_Lines");
            });

            modelBuilder.Entity<LinesBgm>(entity =>
            {
                entity.Property(e => e.id).ValueGeneratedNever();

                entity.HasOne(d => d.idNavigation)
                    .WithOne(p => p.LinesBgm)
                    .HasForeignKey<LinesBgm>(d => d.id)
                    .HasConstraintName("FK_LinesBgm_Lines");
            });

            modelBuilder.Entity<LinesChara>(entity =>
            {
                entity.HasOne(d => d.lines)
                    .WithMany(p => p.LinesChara)
                    .HasForeignKey(d => d.linesId)
                    .HasConstraintName("FK_LinesChara_Lines");
            });

            modelBuilder.Entity<LinesContent>(entity =>
            {
                entity.HasOne(d => d.lines)
                    .WithMany(p => p.LinesContent)
                    .HasForeignKey(d => d.linesId)
                    .HasConstraintName("FK_LinesContent_Lines");
            });

            modelBuilder.Entity<LinesVoice>(entity =>
            {
                entity.HasOne(d => d.lines)
                    .WithMany(p => p.LinesVoice)
                    .HasForeignKey(d => d.linesId)
                    .HasConstraintName("FK_LinesVoice_Lines");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasOne(d => d.sourceUser)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.sourceUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notification_User");
            });

            modelBuilder.Entity<Star>(entity =>
            {
                entity.HasOne(d => d.game)
                    .WithMany(p => p.Star)
                    .HasForeignKey(d => d.gameId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Star_Game");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasOne(d => d.game)
                    .WithMany(p => p.Tag)
                    .HasForeignKey(d => d.gameId)
                    .HasConstraintName("FK_Tag_Game");
            });

            modelBuilder.Entity<View_Group>(entity =>
            {
                entity.ToView("View_Group");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}