using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Music_Streaming.Context;
using Music_Streaming.Models;
using Music_Streaming.ViewModels;
using Music_Streaming.Mappers;

namespace Music_Streaming.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SongsController : ControllerBase
    {
        private readonly MusicContext _context;

        public SongsController(MusicContext context)
        {
            _context = context;
        }

        // GET: api/Songs
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<SongViewModel>>> GetMusicItems([FromQuery] int pageSize = 30, [FromQuery] int pageIndex = 0)
        {
            var songs = await _context.Songs.Skip(pageSize * pageIndex).Take(pageSize).Include(p => p.Album).ToListAsync();
            List<SongViewModel> adapterSongs = new List<SongViewModel>();
            foreach (var item in songs)
            {
                adapterSongs.Add(Mapper.SongToViewModel(item));
            }
            return adapterSongs;
            
        }

        // GET: api/Songs/5 
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<SongViewModel>> GetSong(long id)
        {
            var song = await _context.Songs.FindAsync(id);

            if (song == null)
            {
                return NotFound();
            }

            return Mapper.SongToViewModel(song);
        }

        // PUT: api/Songs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutSong(long id, Song song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }

            _context.Entry(song).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
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

        // POST: api/Songs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Song>> PostSong(Song song)
        {
            _context.Songs.Add(song);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Song>> DeleteSong(long id)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return song;
        }

        private bool SongExists(long id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
    }
}
