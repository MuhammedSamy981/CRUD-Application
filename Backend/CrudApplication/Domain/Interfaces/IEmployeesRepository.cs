using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
public interface IEmployeesRepository:IGenericRepository<Employee>
{
    Task<List<Employee>> GetAllFilteredsAsync(Filters filters);
}
}
