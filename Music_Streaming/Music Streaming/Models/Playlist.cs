using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class Playlist
    {
        public long Id { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public PlaylistSongs PlaylistSongs { get; set; }
        public bool Public { get; set; }

    }
}
