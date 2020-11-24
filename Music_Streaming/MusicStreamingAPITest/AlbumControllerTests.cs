using FluentAssertions;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Music_Streaming;
using Music_Streaming.Models;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace MusicStreamingAPITest
{
    public class AlbumControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public AlbumControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();
                });
            }).CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
                
            });
        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_All()
        {
            
            var response = await _client.GetAsync("api/Albums");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Get_Request_Should_Return_Correct_Count()
        {
            
            var response = await _client.GetAsync("api/Albums");
            var album = JsonConvert.DeserializeObject<Album[]>(await response.Content.ReadAsStringAsync());
            album.Should().HaveCount(2);

        }
        [Fact]
        public async Task Get_Request_Should_Return_Correct_Album_By_Id()
        {

            var response = await _client.GetAsync("api/Albums/1");
            var album = JsonConvert.DeserializeObject<Album>(await response.Content.ReadAsStringAsync());
            Assert.Equal(1, album.Id);


        }


    }
}
