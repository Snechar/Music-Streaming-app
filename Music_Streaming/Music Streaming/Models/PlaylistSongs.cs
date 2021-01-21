using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class PlaylistSongs
    {

        public long Id { get; set; }
        public long SongId { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
        public long PlaylistId { get; set; }

    }
}
