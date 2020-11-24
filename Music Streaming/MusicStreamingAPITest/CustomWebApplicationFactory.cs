using System;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using Music_Streaming.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Music_Streaming.Context;
using MusicStreamingAPITest;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace MusicStreamingAPITest
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbContextOptions<MusicContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<MusicContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                });


                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<MusicContext>();
                    var logger = scopedServices.GetRequiredService<ILogger<CustomWebApplicationFactory<TStartup>>>();


                    db.Database.EnsureCreated();

                    try
                    {
                        Utilities.InitializeDbForTests(db);
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "An error occurred seeding the " +
                            "database with News Articles", ex.Message);
                    }
                }
            });

        }
    }
}
