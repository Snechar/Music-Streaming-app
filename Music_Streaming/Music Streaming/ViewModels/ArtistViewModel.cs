using Music_Streaming.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.ViewModels
{
    public class ArtistViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public ICollection<AlbumViewModel> Albums { get; set; }

    }
}
