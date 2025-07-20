
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.UnitOfWork{
public class UnitOfWork : IUnitOfWork
{
    public IEmployeesRepository EmployeesRepository {get;}

    private readonly ApplicationDbContext _context;
    public UnitOfWork
    (
     ApplicationDbContext context,
     IEmployeesRepository areasRepository)
    {
      _context=context;
      EmployeesRepository=areasRepository;

    }

    public async Task<int> SaveChangesAsync()
    {
       return await _context.SaveChangesAsync();
    }
 
}
}