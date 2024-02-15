using DutchTreat.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace DutchTreat.Data
{
    public class DutchSeeder
    {
        private readonly DutchContext _ctx;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<StoreUser> userManager;

        public DutchSeeder(DutchContext ctx, IWebHostEnvironment env, UserManager<StoreUser> userManager)
        {
            _ctx = ctx;
            _env = env;
            this.userManager = userManager;
        }

        public async Task SeedAsync()
        {
            _ctx.Database.EnsureCreated();

            StoreUser user = await this.userManager.FindByEmailAsync("daniel_mihai_ionescu@yahoo.com");
            if (user == null)
            {
                user = new StoreUser()
                {
                    FirstName = "Daniel",
                    LastName = "Ionescu",
                    Email = "daniel_mihai_ionescu@yahoo.com",
                    UserName = "daniel_mihai_ionescu@yahoo.com"
                };

                var result = await this.userManager.CreateAsync(user, "P@ssw0rd!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            if (!_ctx.Products.Any())
            {
                //Need to create the sample data
                var filePath = Path.Combine(_env.ContentRootPath, "Data/art.json");
                var json = File.ReadAllText(filePath);
                var products = JsonSerializer.Deserialize<IEnumerable<Product>>(json);

                _ctx.Products.AddRange(products);

                var order = new Order()
                {
                    OrderDate = DateTime.Today,
                    OrderNumber = "10000",
                    User = user,
                    Items = new List<OrderItem>()
                    {
                        new OrderItem()
                        {
                            Product = products.First(),
                            Quantity = 5,
                            UnitPrice = products.First().Price
                        }
                    }
                };
                //var order = _ctx.Orders.Where(o => o.Id == 1).FirstOrDefault();
                //if (order != null)
                //{
                //    order.User = user;
                //    order.OrderDate = DateTime.Now;
                //    order.Items = new List<OrderItem>()

                //    {
                //        new OrderItem()
                //        {
                //            Product = products.First(),
                //            Quantity = 5,
                //            UnitPrice = products.First().Price
                //        }
                //    };
                //}

                _ctx.Orders.Add(order);

                _ctx.SaveChanges();
            }
        }
    }
}
