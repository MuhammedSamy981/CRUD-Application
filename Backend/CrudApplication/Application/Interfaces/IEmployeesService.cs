

using Application.DTOs;
using Domain.Models;

namespace Application.Interfaces
{
public interface IEmployeesService
{
    Task<List<EmployeeDto>> GetAllAsync();
    Task<EmployeeDto?> GetByIdAsync(int id);
    Task AddAsync(EmployeeAddDto areaDTO);
    Task<bool> UpdateAsync(EmployeeUpdateDto areaDTO);
    Task<bool> DeleteAsync(int id);
    Task<List<EmployeeDto>> GetAllFilteredsAsync(Filters filters);

}
}