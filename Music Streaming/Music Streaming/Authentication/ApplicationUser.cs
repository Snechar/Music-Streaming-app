using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Music_Streaming.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime DateTimeCreated { get; set; }

        public DateTime LastLoggedIn { get; set; }
    }
}
