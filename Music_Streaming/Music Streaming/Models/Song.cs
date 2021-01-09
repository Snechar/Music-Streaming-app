using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class Song
    {
        
        public long Id { get; set; }
        public string Name { get; set; }
        public double Length { get; set; }
        public Album Album { get; set; }
        public long AlbumId { get; set; }
        public DateTime DateTimeCreated { get; set; }
        

    }
}
