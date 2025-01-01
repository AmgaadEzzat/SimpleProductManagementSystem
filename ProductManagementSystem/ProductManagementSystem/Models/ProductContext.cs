using Microsoft.EntityFrameworkCore;

namespace ProductManagementSystem.Models
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options ) : base(options) 
        { 
        }

        public virtual DbSet<Product> Products { get; set; }
    }
}
