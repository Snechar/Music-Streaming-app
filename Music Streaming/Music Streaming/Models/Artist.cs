using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class Artist
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public ICollection<Song> Songs { get; set; }

        public ICollection<Album> Albums { get; set; }

    }
}
