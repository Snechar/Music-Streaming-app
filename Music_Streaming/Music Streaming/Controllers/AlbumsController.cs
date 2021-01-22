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
    public class AlbumsController : ControllerBase
    {
        private readonly MusicContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AlbumsController(MusicContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
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
                var artistman = await _context.Artists.Where(x => x.Id == item.Album.ArtistId).FirstAsync();
                songViewModels.Add(Mapper.SongToViewModel(item,artistman));
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
        // GET: api/Albums/user/5
        // Gets the albums made by the user
        [HttpGet("user/{id}")]
        [Authorize]
        public async Task<ActionResult<AlbumViewModel>> GetAlbumByUser(long id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "I don't know how you could possibly get this error message but you managed to do it" });
            }
            var artist = await _context.Artists.Where(x => x.UserId == user.Id).FirstAsync();
            if(artist == null)
            {
                return Unauthorized();
            }
            var album = await _context.Albums.Where(p => p.Id == id).Where(x => x.ArtistId == artist.Id).FirstOrDefaultAsync();
            if(album == null)
            {
                return Unauthorized();
            }

            
            return Mapper.AlbumToViewModel(album, null, Mapper.ArtistToViewModel(artist));
        }

        // GET: api/Albums/user
        // Gets the albums made by the user
        [HttpGet("user")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AlbumViewModel>>> GetAlbumByUser()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "I don't know how you could possibly get this error message but you managed to do it" });
            }
            var artist = await _context.Artists.Where(x => x.UserId == user.Id).FirstAsync();
            if(artist == null)
            {
                return Unauthorized();
            }
            var albums = await _context.Albums.Where(x=>x.ArtistId == artist.Id).ToListAsync();

            List<AlbumViewModel> AlbumsViewModels = new List<AlbumViewModel>();

            foreach (var item in albums)
            {


                AlbumsViewModels.Add(Mapper.AlbumToViewModel(item, null, Mapper.ArtistToViewModel(artist)));
            }
            return AlbumsViewModels;
        }

        // POST: api/Albums
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AlbumViewModel>> PostAlbum(AlbumViewModel album)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "I don't know how you could possibly get this error message but you managed to do it" });
            }
            var artist = await _context.Artists.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

            var albumCheck = await _context.Albums.Where(x => x.Name == album.Name).FirstOrDefaultAsync();

            if(albumCheck != null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "There is already an album with this name" });
            }

            Album album1 = new Album
            {
                Name = album.Name,
                DateTimeCreated = DateTime.Now,
                ArtistId= artist.Id,
                
            };
            _context.Albums.Add(album1);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlbum", new { id = album1.Id }, album);
        }

        // DELETE: api/Albums/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Album>> DeleteAlbum(long id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized(new Response { Status = "Fail", Message = "Invalid User" });
            }
            var roles = await userManager.GetRolesAsync(user);
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                return NotFound(new Response { Status = "Fail", Message = "Invalid Album" });
            }
            if(roles.Count()>0)
            {

                if (roles[0] == "Admin")
                {
                    _context.Albums.Remove(album);
                    await _context.SaveChangesAsync();

                    return album;
                }
                else
                {
                    var artist = await _context.Artists.Where(x => x.UserId == user.Id).FirstAsync();
                    if (artist == null)
                    {
                        return BadRequest(new Response { Status = "Fail", Message = "User is not an artist" });
                    }



                    if (album.ArtistId != artist.Id)
                    {
                        return Unauthorized(new Response { Status = "Fail", Message = "User does not own album" });
                    }

                    _context.Albums.Remove(album);
                    await _context.SaveChangesAsync();

                    return album;
                }
            }
            else
            {

                var artist = await _context.Artists.Where(x => x.UserId == user.Id).FirstAsync();
                if (artist == null)
                {
                    return BadRequest(new Response { Status = "Fail", Message = "User is not an artist" });
                }



                if (album.ArtistId != artist.Id)
                {
                    return Unauthorized(new Response { Status = "Fail", Message = "User does not own album" });
                }

                _context.Albums.Remove(album);
                await _context.SaveChangesAsync();

                return album;
            }
        }

        private bool AlbumExists(long id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }
    }
}
