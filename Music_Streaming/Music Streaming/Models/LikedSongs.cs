using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class LikedSongs
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public long SongId { get; set; }
        public Song Song { get; set; }
    }
}
