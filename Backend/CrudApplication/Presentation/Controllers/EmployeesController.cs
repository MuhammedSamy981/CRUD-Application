using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.DTOs;
using Domain.Models;

namespace Presentation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeesService _employeesService;

    public EmployeesController(IEmployeesService employeesService)
    {
        _employeesService = employeesService;
    }

    [HttpGet]
    public async Task<ActionResult<List<EmployeeDto>>> GetAllAsync()
    {
        return await _employeesService.GetAllAsync(); 
    }

    [HttpGet]
    [Route("{id}")]
    public async Task< ActionResult<EmployeeDto>> GetByIdAsync(int id)
    {
        var employee = await _employeesService.GetByIdAsync(id);
        if (employee is null)
            return NotFound();

        return employee;
    }

    [HttpPost]
    public async Task<ActionResult> AddAsync(EmployeeAddDto employeeDto)
    {
        await _employeesService.AddAsync(employeeDto);
        return StatusCode(StatusCodes.Status201Created);
    }


    [HttpPut]
    public async Task<ActionResult> UpdateAsync(EmployeeUpdateDto employeeDto)
    {
        bool result = await _employeesService.UpdateAsync(employeeDto);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task< ActionResult> DeleteAsync(int id)
    {
        var employee = await _employeesService.DeleteAsync(id);
        if (!employee){
            return NotFound();}

          return NoContent();
    }

         [HttpGet("Filtered")]
    public async Task<ActionResult<List<EmployeeDto>>> GetAllFilteredsAsync([FromQuery]Filters filters)
    {   
            return await _employeesService.GetAllFilteredsAsync(filters);
   }
}
