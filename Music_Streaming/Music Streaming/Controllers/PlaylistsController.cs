﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Music_Streaming.Authentication;
using Music_Streaming.Context;
using Music_Streaming.Mappers;
using Music_Streaming.Models;
using Music_Streaming.ViewModels;

namespace Music_Streaming.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        private readonly MusicContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public PlaylistsController(MusicContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // GET: api/Playlists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Playlist>>> GetPlaylist()
        {
            return await _context.Playlist.ToListAsync();
        }

        // GET: api/Playlists/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<PlaylistViewModel>> GetPlaylist(long id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized("It stops here");
            }

            var playlist = await _context.Playlist.FindAsync(id);


            if (playlist == null)
            {
                return NotFound();
            }
            if (user.Id != playlist.UserID)
            {
                return Unauthorized("Not your playlist bro");
            }

            var songs = await _context.PlaylistSongs.Where(x => x.PlaylistId == playlist.Id).ToListAsync();
            List<SongViewModel> songViewModels = new List<SongViewModel>();
            foreach (var item in songs)
            {
                var song = await _context.Songs.Include(p => p.Album).Where(x => x.Id == item.SongId).FirstAsync();
                var artist = await _context.Artists.FindAsync(song.Album.ArtistId);
                songViewModels.Add(Mapper.SongToViewModel(song,artist));
            }

            return Mapper.PlaylistToViewModel(playlist, songViewModels);
        }

        // PUT: api/Playlists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaylist(long id, Playlist playlist)
        {
            if (id != playlist.Id)
            {
                return BadRequest();
            }

            _context.Entry(playlist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaylistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Playlists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Playlist>> PostPlaylist(Playlist playlist)
        {
            _context.Playlist.Add(playlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaylist", new { id = playlist.Id }, playlist);
        }

        // DELETE: api/Playlists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Playlist>> DeletePlaylist(long id)
        {
            var playlist = await _context.Playlist.FindAsync(id);
            if (playlist == null)
            {
                return NotFound();
            }

            _context.Playlist.Remove(playlist);
            await _context.SaveChangesAsync();

            return playlist;
        }

        private bool PlaylistExists(long id)
        {
            return _context.Playlist.Any(e => e.Id == id);
        }
    }
}
