using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Music_Streaming.Models
{
    public class AdapterAlbum
    {
        public AdapterAlbum(Album album)
        {
            this.Id = album.Id;
            this.Name = album.Name;
            this.Songs = new List<AdapterSong>();
            foreach (var item in album.Songs)
            {
                var song = new AdapterSong(item);
                this.Songs.Add(song);
            }
        }
        public long Id { get; set; }
        public string Name { get; set; }
        public ICollection<AdapterSong> Songs { get; set; }
    }
}
