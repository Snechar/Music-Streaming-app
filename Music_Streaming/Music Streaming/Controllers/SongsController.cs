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
using Microsoft.AspNetCore.Identity;
using Music_Streaming.Authentication;

namespace Music_Streaming.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SongsController : ControllerBase
    {
        private readonly MusicContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public SongsController(MusicContext context,UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
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
                var artist = await _context.Artists.Where(x => x.Id == item.Album.ArtistId).FirstAsync();
                adapterSongs.Add(Mapper.SongToViewModel(item,artist));
            }
            return adapterSongs;
            
        }

        // GET: api/Songs/5 
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<SongViewModel>> GetSong(long id)
        {
            var song = await _context.Songs.Include(p => p.Album).Where(x => x.Id == id).FirstAsync();

            if (song == null)
            {
                return NotFound();
            }
            var artistman = await _context.Artists.Where(x => x.Id == song.Album.ArtistId).FirstAsync();
            return Mapper.SongToViewModel(song,artistman);
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
        public async Task<ActionResult<SongViewModel>> PostSong(SongViewModel song)
        {

            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized("It stops here");
            }
            var artist = await _context.Artists.Where(x => x.UserId == user.Id).FirstAsync();

            if(artist.UserId != user.Id)
            {
                return Unauthorized("You are not the owner of this album");
            }

            var albumCheck = await _context.Albums.Where(x => x.Id == song.AlbumId).FirstAsync();

            if (albumCheck == null)
            {
                return BadRequest("Album does not exist");
            }


            Song song1 = new Song
            {
                Name= song.Name,
                AlbumId= song.AlbumId,
                DateTimeCreated = DateTime.Now,
                Length = song.Length,
                
                
            };

            _context.Songs.Add(song1);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSong", new { id = song1.Id }, song);
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<SongViewModel>> DeleteSong(long id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "Stop playing around with the API calls, you can't get this error unless you try to backdoor" });
            }
            var song = await _context.Songs.Include(p=>p.Album).Where(p=>p.Id==id).FirstOrDefaultAsync();
            if (song == null)
            {
                return NotFound(new Response { Status = "Fail", Message = "Song was not found" });
            }
            var artist = await _context.Artists.Where(p => p.Id == song.Album.ArtistId).FirstOrDefaultAsync();
            if(artist == null)
            {
                return BadRequest(new Response { Status = "Fail", Message = "Artist does not exist" });
            }
            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return Mapper.SongToViewModel(song, artist);
        }

        private bool SongExists(long id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
    }
}
