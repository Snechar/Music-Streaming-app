using Music_Streaming.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Data
{
    public class DbInitializer
    {
        public static void Initialize(MusicContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
