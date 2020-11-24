using System.Text;
using System;
using Xunit;
using Music_Streaming.Data;
using Music_Streaming.Models;
using Music_Streaming.Context;
using System.Collections.Generic;
using Music_Streaming;
using FluentAssertions;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Threading.Tasks;
using System.Net;
using Newtonsoft.Json;

namespace MusicStreamingAPITest
{
    public class ArtistControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public ArtistControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });
        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_All()
        {
            var response = await _client.GetAsync("api/Artists");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Get_Request_Should_Return_Correct_Count()
        {
            var response = await _client.GetAsync("api/Artists");
            var artists = JsonConvert.DeserializeObject<Artist[]>(await response.Content.ReadAsStringAsync());
            artists.Should().HaveCount(2);

        }
        [Fact]
        public async Task Get_Request_Should_Return_Correct_Artist_By_Id()
        {
            
            var response = await _client.GetAsync("api/Artists/1");
            var artists = JsonConvert.DeserializeObject<Artist>(await response.Content.ReadAsStringAsync());
            Assert.Equal(1, artists.Id);


        }
        [Fact]
        public async Task Get_Request_Should_Return_Correct_Artist_With_Album()
        {

            var response = await _client.GetAsync("api/Artists/1");
            var artists = JsonConvert.DeserializeObject<Artist>(await response.Content.ReadAsStringAsync());
            Assert.Equal(1, artists.Albums.Count);


        }

    }
}
