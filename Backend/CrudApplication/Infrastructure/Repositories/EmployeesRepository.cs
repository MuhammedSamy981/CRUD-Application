
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
public class EmployeesRepository : GenericRepository<Employee>,IEmployeesRepository
{      


        private readonly ApplicationDbContext _context;
      public EmployeesRepository(ApplicationDbContext context): base(context)
       {
 _context = context;
       }

    public async Task<List<Employee>> GetAllFilteredsAsync(Filters filters)
    {   
      var products=await _context.Set<Employee>()
      .Where(e=>e.FirstName.ToLower().Contains(filters.FirstName.ToLower())
       && e.LastName.ToLower().Contains(filters.LastName.ToLower()) 
      && e.Email.ToLower().Contains(filters.Email.ToLower()) 
      && e.Position.ToLower().Contains(filters.Position.ToLower()) )
      .ToListAsync();
         return products;
    }
}
}