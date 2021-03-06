﻿using Music_Streaming.Models;
using Music_Streaming.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music_Streaming.Mappers
{
    public static class Mapper
    {
        public static SongViewModel SongToViewModel(Song song, Artist artist) =>
            new SongViewModel
            {
                Id = song.Id,
                AlbumId = song.Album.Id,
                AlbumName = song.Album.Name,
                Name = song.Name,
                Length = song.Length,
                ArtistName = song.Album.Artist.Name,
                ArtistId= artist.Id



            };

        public static ArtistViewModel ArtistToViewModel(Artist artist, List<AlbumViewModel> album = null) =>
            new ArtistViewModel
            {
                Id = artist.Id,
                Name = artist.Name,
                Albums = album
            };
        public static AlbumViewModel AlbumToViewModel(Album album, List<SongViewModel> songs = null, ArtistViewModel artist = null) =>
            new AlbumViewModel
            {
                Id = album.Id,
                Name = album.Name,
                Songs = songs,
                ArtistId = album.ArtistId,
                ArtistName = artist.Name

            };

        public static PlaylistViewModel PlaylistToViewModel(Playlist playlist, List<SongViewModel> songViewModels) =>
            new PlaylistViewModel
            {
                Name = playlist.Name,
                PlaylistSongs = songViewModels

            };
        public static PlaylistForAddingViewModel PlaylistForAddingToViewModel(Playlist playlist) =>
            new PlaylistForAddingViewModel
            {
                Id = playlist.Id,
                Name = playlist.Name,
            };
    }
}
