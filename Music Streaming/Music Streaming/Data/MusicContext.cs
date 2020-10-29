using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.EntityFrameworkCore;
using Music_Streaming.Authentication;
using Music_Streaming.Models;

namespace Music_Streaming.Context
{
    public class MusicContext : IdentityDbContext<ApplicationUser>
    {
        public MusicContext(DbContextOptions<MusicContext> options):
            base(options)
        {
        }
        
        public DbSet<Song> Songs { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Artist> Artists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
    
}

