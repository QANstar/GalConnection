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

        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<EventTreeViewData> EventTreeViewData { get; set; }
        public virtual DbSet<EventsMap> EventsMap { get; set; }
        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<Lines> Lines { get; set; }
        public virtual DbSet<LinesContent> LinesContent { get; set; }
        public virtual DbSet<LinesVoice> LinesVoice { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<MaterialFile> MaterialFile { get; set; }
        public virtual DbSet<Option> Option { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserGroup> UserGroup { get; set; }
        public virtual DbSet<UserPlayedGame> UserPlayedGame { get; set; }
        public virtual DbSet<View_Group> View_Group { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventTreeViewData>(entity =>
            {
                entity.Property(e => e.eventid).ValueGeneratedNever();

                entity.HasOne(d => d._event)
                    .WithOne(p => p.EventTreeViewData)
                    .HasForeignKey<EventTreeViewData>(d => d.eventid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventTreeViewData_Event");
            });

            modelBuilder.Entity<LinesContent>(entity =>
            {
                entity.HasOne(d => d.lines)
                    .WithMany(p => p.LinesContent)
                    .HasForeignKey(d => d.linesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LinesContent_Lines");
            });

            modelBuilder.Entity<LinesVoice>(entity =>
            {
                entity.HasOne(d => d.lines)
                    .WithMany(p => p.LinesVoice)
                    .HasForeignKey(d => d.linesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LinesVoice_Lines");
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