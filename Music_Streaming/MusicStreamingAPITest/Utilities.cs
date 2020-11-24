using System;
using Xunit;
using Music_Streaming.Data;
using Music_Streaming.Models;
using Music_Streaming.Context;
using System.Collections.Generic;
using Music_Streaming.Authentication;

namespace MusicStreamingAPITest
{
    public class Utilities
    {

        public static void InitializeDbForTests(MusicContext db)
        {
           // System.Diagnostics.Debugger.Launch();
            db.Artists.AddRange(GetArtists());
            db.Albums.AddRange(GetAlbums());
            db.Songs.AddRange(GetSongs());
            db.Users.AddRange(GetUsers());
            db.SaveChanges();


        }

        public static List<Song> GetSongs()
        {
            return new List<Song>()
            {
            new Song(){Id=1, Name="Selenium Forest", Length=6.30, AlbumId=1, DateTimeCreated=DateTime.Parse("2020-9-19-11:35")},
            new Song(){Id = 2, Name = "Electric Sunrise", Length = 4.20, AlbumId = 1,DateTimeCreated=DateTime.Parse("2020-9-19-11:35") },
            new Song(){Id=3, Name="Every Piece Matters", Length=8, AlbumId=1,DateTimeCreated=DateTime.Parse("2020-9-19-11:35")},
            new Song(){Id=4, Name="From the sky", Length=5.48, AlbumId=2,DateTimeCreated=DateTime.Parse("2020-9-9-11:35")},
            new Song(){Id=5, Name="Flying Whales", Length=7.44, AlbumId=2,DateTimeCreated=DateTime.Parse("2020-9-9-11:35")}
            };
        }
        public static List<Album> GetAlbums()
        {
            return new List<Album>()
            {
                new Album(){Id = 1, Name="Other Things",ArtistId=1,DateTimeCreated=DateTime.Parse("2020-9-19-11:35")},
                new Album(){Id = 2, Name="From Mars to Sirius",ArtistId=2,DateTimeCreated=DateTime.Parse("2020-9-9-11:35")},

            };
        }
        public static List<Artist> GetArtists()
        {
            return new List<Artist>()
            {
                new Artist(){Id=1, Name="Plini"},
                new Artist(){Id=2, Name="Gojira"}
            };
        }
        public static List<ApplicationUser> GetUsers()
        {
            return new List<ApplicationUser>()
            {
             new ApplicationUser(){Id = "1", UserName = "Snechar", Email="Ricardo@gmail.com", PasswordHash="123"},
             new ApplicationUser(){Id = "2", UserName = "Miloso", Email="Miloso@gmail.com", PasswordHash="123123"},
             new ApplicationUser(){Id = "3", UserName = "Henry", Email="Henry@gmail.com", PasswordHash="123123"},
            };
        }
    }
}
