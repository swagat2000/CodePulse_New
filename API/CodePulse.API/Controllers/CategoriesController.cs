using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CodePulse.API.Models.Domain;
using CodePulse.API;
using CodePulse.API.Repositories.Interface;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        
        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            // Map DTO to Domain Model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await _categoryRepository.CreateAsync(category);

            //domain to DTO back mapping
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);

        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();

            // Map Domain Models to DTOs
            var response = new List<CategoryDto>();
            foreach (var category in categories)
            {
                var categoryDto = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                };
                response.Add(categoryDto);
            }

            return Ok(response);
        }
    }
}

            
