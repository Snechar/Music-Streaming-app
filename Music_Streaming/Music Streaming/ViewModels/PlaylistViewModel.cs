using Music_Streaming.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.ViewModels
{
    public class PlaylistViewModel
    {
        public string Name { get; set; }
        public List<SongViewModel> PlaylistSongs { get; set; }
    }
}
