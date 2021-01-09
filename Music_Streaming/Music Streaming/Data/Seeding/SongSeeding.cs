using Microsoft.EntityFrameworkCore;
using Music_Streaming.Context;
using Music_Streaming.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Data.Seeding
{
    public class SongSeeding
    {
        private MusicContext musicContext;
        public SongSeeding(MusicContext mc)
        {
            musicContext = mc;
        }
        public void SeedSong()
        {
            if(!musicContext.Songs.Any())
            {
                Artist artist = new Artist
                {
                    Name = "Plini",
                };
                
                Album album1 = new Album
                {
                    
                    Name = "Other Things",
                    Songs = new List<Song>(),
                    ArtistId = 1,
                    DateTimeCreated = DateTime.Parse("2020-9-19-11:35")
                    
                };
                Song song1 = new Song
                {

                    Name = "Selenium Forest",
                    Length = 6.05,
                    AlbumId = 1,
                    DateTimeCreated = DateTime.Parse("2020-9-19-11:35")

                };
                Song song2 = new Song
                {

                    Name = "Electric Sunrise",
                    Length = 5.50,
                    AlbumId = 1,
                    DateTimeCreated = DateTime.Parse("2020-9-19-1:35")

                };
                Playlist playlist = new Playlist
                {
                    Name = "Plini is good",
                    Public = true,

                };
                PlaylistSongs playlistSongs = new PlaylistSongs
                {
                    SongId = 1,
                    PlaylistId= 1,
                };
                musicContext.Artists.Add(artist);
                musicContext.SaveChanges();
                musicContext.Albums.Add(album1);
                musicContext.SaveChanges();
                musicContext.Songs.Add(song1);
                musicContext.Songs.Add(song2);
                musicContext.SaveChanges();
                musicContext.Playlist.Add(playlist);
                musicContext.SaveChanges();
                musicContext.PlaylistSongs.Add(playlistSongs);
                musicContext.SaveChanges();




            }
        }
            
    }
}
