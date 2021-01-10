using System;
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
using Music_Streaming.Models;
using Music_Streaming.ViewModels;

namespace Music_Streaming.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistSongsController : ControllerBase
    {
        private readonly MusicContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public PlaylistSongsController(MusicContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // POST: api/PlaylistSongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PlaylistSongs>> PostPlaylistSongs(PlaylistSongs playlistSongs)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "I don't know how you could possibly get this error message but you managed to do it" });
            }
            var playlist = await _context.Playlist.Where(x => x.Id == playlistSongs.PlaylistId).FirstOrDefaultAsync();
            if(playlist.UserID != user.Id)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "You do not own this playlist" });
            }
            _context.PlaylistSongs.Add(playlistSongs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaylistSongs", new { id = playlistSongs.Id }, playlistSongs);
        }

        // DELETE: api/PlaylistSongs/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<PlaylistSongs>> DeletePlaylistSongs(long id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "I don't know how you could possibly get this error message but you managed to do it" });
            }

            var playlistSongs = await _context.PlaylistSongs.FindAsync(id);
            if (playlistSongs == null)
            {
                return NotFound();
            }
            var playlist = await _context.Playlist.Where(x => x.Id == playlistSongs.PlaylistId).FirstOrDefaultAsync();
            if (playlist.UserID != user.Id)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "You do not own this playlist" });
            }

            _context.PlaylistSongs.Remove(playlistSongs);
            await _context.SaveChangesAsync();

            return playlistSongs;
        }

        private bool PlaylistSongsExists(long id)
        {
            return _context.PlaylistSongs.Any(e => e.Id == id);
        }
    }
}
