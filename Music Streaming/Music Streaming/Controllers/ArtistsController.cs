using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class ArtistsController : ControllerBase
    {
        private readonly MusicContext _context;



        public ArtistsController(MusicContext context)
        {
            _context = context;
        }

        // GET: api/Artists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistViewModel>>> GetArtists([FromQuery] int pageSize = 30, [FromQuery] int pageIndex = 0)
        {
            var artists = await _context.Artists.Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
            List<ArtistViewModel> ArtistsViewModels = new List<ArtistViewModel>();
            foreach (var item in artists)
            {
                ArtistsViewModels.Add(Mapper.ArtistToViewModel(item));
            }
            return ArtistsViewModels;
        }

        // GET: api/Artists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistViewModel>> GetArtist(long id)
        {
            var artist = await _context.Artists.FirstOrDefaultAsync();

            if (artist == null)
            {
                return NotFound();
            }
            var albums = await _context.Albums.Where(x => x.ArtistId == artist.Id).ToListAsync();
            List<AlbumViewModel> albumViewModels = new List<AlbumViewModel>();
            
            foreach (var item in albums)
            {
                var songs = await _context.Songs.Where(x => x.AlbumId == item.Id).ToListAsync();
                List<SongViewModel> songViewModels = new List<SongViewModel>();
                foreach (var song in songs)
                {
                    songViewModels.Add(Mapper.SongToViewModel(song));
                }

                albumViewModels.Add(Mapper.AlbumToViewModel(item,songViewModels,Mapper.ArtistToViewModel(artist)));
            }

            return Mapper.ArtistToViewModel(artist, albumViewModels);
        }

        // PUT: api/Artists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtist(long id, Artist artist)
        {
            if (id != artist.Id)
            {
                return BadRequest();
            }

            _context.Entry(artist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistExists(id))
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

        // POST: api/Artists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Artist>> PostArtist(Artist artist)
        {
            _context.Artists.Add(artist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtist", new { id = artist.Id }, artist);
        }

        // DELETE: api/Artists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Artist>> DeleteArtist(long id)
        {
            var artist = await _context.Artists.FindAsync(id);
            if (artist == null)
            {
                return NotFound();
            }

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ArtistExists(long id)
        {
            return _context.Artists.Any(e => e.Id == id);
        }
    }
}
