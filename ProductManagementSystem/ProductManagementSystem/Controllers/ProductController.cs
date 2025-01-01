using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Models;

namespace ProductManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductController(ProductContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _context.Products.ToListAsync();
                if (products == null || !products.Any())
                {
                    return NoContent();
                }

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest(new { message = "Wrong Product Id!" });
                }

                var existingProduct = await _context.Products.FindAsync(id);
                if (existingProduct == null)
                {
                    return NotFound(new { message = "Product not found." });
                }

                return Ok(existingProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Validation failed" });   
                } 
                else
                {
                    _context.Products.Add(product);
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Product created successfully.", product });
                }
            } catch (Exception ex) 
            { 
                return StatusCode(500, new { message = "An error occurred while creating the product.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, Product editedProduct)
        {
            try
            {
                if (id == 0 )
                {
                    return BadRequest(new { message = "Wrong Product Id!" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Validation failed"});
                }

                var existingProduct = await _context.Products.FindAsync(id);
                if (existingProduct == null)
                {
                    return NotFound(new { message = "Product not found." });
                }

                existingProduct.Name = editedProduct.Name;
                existingProduct.Description = editedProduct.Description;
                existingProduct.Price = editedProduct.Price;
                existingProduct.CreatedDate = editedProduct.CreatedDate;
                existingProduct.ImageURL = editedProduct.ImageURL;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Product updated successfully.", product = existingProduct });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the product.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest(new { message = "Wrong Product Id!" });
                }

                var DeletedProduct = await _context.Products.FindAsync(id);
                if (DeletedProduct == null)
                {
                    return NotFound();
                }
                _context.Products.Remove(DeletedProduct);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Product deleted successfully." });

            } catch (Exception ex) 
            {
                return StatusCode(500, new { message = "An error occurred while deleted the product.", error = ex.Message });
            }
        }

    }
}
