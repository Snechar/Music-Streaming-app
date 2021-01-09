using Music_Streaming.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.ViewModels
{
    public class SongViewModel
    {

        public long Id { get; set; }
        public string Name { get; set; }
        public double Length { get; set; }
        public string AlbumName { get; set; }
        public long AlbumId { get; set; }
        public string ArtistName { get; set; }
        
    }
}
