using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Music_Streaming.Models
{
    public class Album
    {
        
        public long Id { get; set; }
        public string Name { get; set; }
        
        public ICollection<Song> Songs { get; set; }
        

        
    }
}
