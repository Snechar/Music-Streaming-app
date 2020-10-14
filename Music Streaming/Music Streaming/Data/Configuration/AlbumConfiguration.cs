using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Music_Streaming.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Data.Configuration
{
    public class AlbumConfiguration : IEntityTypeConfiguration<Album>
    {

        public void Configure(EntityTypeBuilder<Album> builder)
        {

        }
    }
}
