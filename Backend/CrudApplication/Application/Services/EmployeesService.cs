
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Services
{
    public class EmployeesService : IEmployeesService
    {
        private readonly IUnitOfWork _unitOfWork;

    public EmployeesService(IUnitOfWork unitOfWork)
        {
         
        _unitOfWork = unitOfWork;
    }

    public async Task<List<EmployeeDto>> GetAllAsync()
    {
        var employees =await _unitOfWork.EmployeesRepository.GetAllAsync();

           return employees.Select(employees=> new EmployeeDto 
           {
             Id=employees.Id,
             FirstName=employees.FirstName,
             LastName=employees.LastName,
             Email=employees.Email,
             Position=employees.Position
           }).ToList();
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee =await _unitOfWork.EmployeesRepository.GetByIdAsync(id);
        if (employee != null)
        {
             return new EmployeeDto
             {
                             Id=employee.Id,
             FirstName=employee.FirstName,
             LastName=employee.LastName,
             Email=employee.Email,
             Position=employee.Position
             };
        }
        return null;
    }

    public async Task AddAsync(EmployeeAddDto employeeDTO)
    {

        var employee = new Employee
             {
             FirstName=employeeDTO.FirstName,
             LastName=employeeDTO.LastName,
             Email=employeeDTO.Email,
             Position=employeeDTO.Position
             };

       await _unitOfWork.EmployeesRepository.AddAsync(employee);
       await _unitOfWork.SaveChangesAsync();

    }

    public async Task<bool> UpdateAsync(EmployeeUpdateDto employeeDTO)
    {
              var employee=await _unitOfWork.EmployeesRepository.GetByIdAsync(employeeDTO.Id);
        if(employee==null)
        {
            return false;
        }
        employee.Id=employeeDTO.Id;
        employee.FirstName=employeeDTO.FirstName;
        employee.LastName=employeeDTO.LastName;
        employee.Email=employeeDTO.Email;
        employee.Position=employeeDTO.Position;
             
       await _unitOfWork.EmployeesRepository.UpdateAsync(employee);
      await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee=await _unitOfWork.EmployeesRepository.GetByIdAsync(id);
        if(employee==null)
        {
            return false;
        }
       await _unitOfWork.EmployeesRepository.DeleteAsync(employee);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

        public async Task<List<EmployeeDto>> GetAllFilteredsAsync(Filters filters)
    {   
            var employees =await _unitOfWork.EmployeesRepository.GetAllFilteredsAsync(filters);
              return employees.Select(employees=> new EmployeeDto 
           {
            Id=employees.Id,
             FirstName=employees.FirstName,
             LastName=employees.LastName,
             Email=employees.Email,
             Position=employees.Position
           }).ToList();
    }

    }
}