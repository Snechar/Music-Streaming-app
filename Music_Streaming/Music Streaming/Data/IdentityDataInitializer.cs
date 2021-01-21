using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Music_Streaming.Authentication;
using Music_Streaming.Context;

namespace Music_Streaming.Data
{
    public class IdentityDataInitializer
    {
        public static void SeedData(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, MusicContext context)
        {
            context.Database.EnsureCreated();
            if (context.Users.Any() || context.Roles.Any())
            {
                return;
            }

            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<ApplicationUser> userManager)
        {
            var hasher = new PasswordHasher<ApplicationUser>();
            if (userManager.FindByNameAsync("user").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "user";
                user.NormalizedUserName = "user";
                user.Email = "user@gmail.com";
                user.NormalizedEmail = "user@gmail.com".ToUpper();
                user.EmailConfirmed = false;
                user.LastLoggedIn = DateTime.Now;
                user.DateTimeCreated = DateTime.Now;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = userManager.CreateAsync
                (user, "Password@0").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }
            if (userManager.FindByNameAsync("tester").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "tester";
                user.NormalizedUserName = "tester";
                user.Email = "tester@gmail.com";
                user.NormalizedEmail = "tester@gmail.com".ToUpper();
                user.EmailConfirmed = false;
                user.LastLoggedIn = DateTime.Now;
                user.DateTimeCreated = DateTime.Now;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = userManager.CreateAsync
                (user, "Password@0").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Tester").Wait();
                }
            }


            if (userManager.FindByNameAsync("admin").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "admin";
                user.NormalizedUserName = "admin";
                user.Email = "admin@gmail.com";
                user.NormalizedEmail = "admin@gmail.com".ToUpper();
                user.EmailConfirmed = false;
                user.LastLoggedIn = DateTime.Now;
                user.DateTimeCreated = DateTime.Now;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = userManager.CreateAsync
                (user, "Password@1").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {

            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "User";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Tester").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Tester";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Admin";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    } }
