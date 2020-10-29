using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class AdapterSong
    {
        public AdapterSong(Song song)
        {
            this.Id = song.Id;
            this.Name = song.Name;
            this.Length = song.Length;
            this.AlbumID = song.AlbumId;
            this.AlbumName = song.Album.Name;
        }
        public long Id { get; set; }
        public string Name { get; set; }
        public string AlbumName { get; set; }
        public double Length { get; set; }
        public long AlbumID { get; set; }
    }
}
