using GBIT.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GBIT.API.Data
{
    public class GBITDbContext : DbContext
    {
        public GBITDbContext(DbContextOptions<GBITDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Item> Items { get; set; }
    }
}