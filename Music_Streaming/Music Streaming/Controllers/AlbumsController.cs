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
    public class AlbumsController : ControllerBase
    {
        private readonly MusicContext _context;

        public AlbumsController(MusicContext context)
        {
            _context = context;
        }

        // GET: api/Albums
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AlbumViewModel>>> GetAlbums([FromQuery] int pageSize = 30, [FromQuery] int pageIndex = 0)
        {
            var albums = await _context.Albums.Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
            List<AlbumViewModel> AlbumsViewModels = new List<AlbumViewModel>();

            foreach (var item in albums)
            {
                var artist = await _context.Artists.Where(x => x.Id == item.ArtistId).FirstAsync();
                
                AlbumsViewModels.Add(Mapper.AlbumToViewModel(item,null,Mapper.ArtistToViewModel(artist)));
            }
            return AlbumsViewModels;
        }

        // GET: api/Albums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumViewModel>> GetAlbum(long id)
        {
            var album = await _context.Albums.FirstAsync(p=>p.Id==id);


            if (album == null)
            {
                return NotFound();
            }
            var songs = await _context.Songs.Where(x=>x.AlbumId==album.Id).ToListAsync();
            List<SongViewModel> songViewModels = new List<SongViewModel>();
            foreach (var item in songs)
            {
                songViewModels.Add(Mapper.SongToViewModel(item));
            }
            var artist = await _context.Artists.Where(x => x.Id == album.ArtistId).FirstAsync();


            return Mapper.AlbumToViewModel(album, songViewModels, Mapper.ArtistToViewModel(artist));
        }

        // PUT: api/Albums/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum(long id, Album album)
        {
            if (id != album.Id)
            {
                return BadRequest();
            }

            _context.Entry(album).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
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

        // POST: api/Albums
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Album>> PostAlbum(Album album)
        {
            _context.Albums.Add(album);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlbum", new { id = album.Id }, album);
        }

        // DELETE: api/Albums/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Album>> DeleteAlbum(long id)
        {
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return album;
        }

        private bool AlbumExists(long id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }
    }
}
