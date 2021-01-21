using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Music_Streaming.Context;
using Music_Streaming.Models;

namespace Music_Streaming.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikedSongsController : ControllerBase
    {
        private readonly MusicContext _context;

        public LikedSongsController(MusicContext context)
        {
            _context = context;
        }


        // POST: api/LikedSongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LikedSongs>> PostLikedSongs(LikedSongs likedSongs)
        {
            _context.LikedSongs.Add(likedSongs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLikedSongs", new { id = likedSongs.Id }, likedSongs);
        }

        // DELETE: api/LikedSongs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LikedSongs>> DeleteLikedSongs(long id)
        {
            var likedSongs = await _context.LikedSongs.FindAsync(id);
            if (likedSongs == null)
            {
                return NotFound();
            }

            _context.LikedSongs.Remove(likedSongs);
            await _context.SaveChangesAsync();

            return likedSongs;
        }

        private bool LikedSongsExists(long id)
        {
            return _context.LikedSongs.Any(e => e.Id == id);
        }
    }
}
