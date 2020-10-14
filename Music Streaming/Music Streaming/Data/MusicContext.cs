using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.EntityFrameworkCore;
using Music_Streaming.Data.Configuration;
using Music_Streaming.Models;

namespace Music_Streaming.Context
{
    public class MusicContext : DbContext
    {
        public MusicContext(DbContextOptions<MusicContext> options):
            base(options)
        {
        }

        public DbSet<Song> Songs { get; set; }
        public DbSet<Album> Albums { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SongConfiguration());
            modelBuilder.ApplyConfiguration(new AlbumConfiguration());
            base.OnModelCreating(modelBuilder);
        }

    }
    
}

