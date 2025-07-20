namespace Domain.Interfaces{
public interface IUnitOfWork
{
    public IEmployeesRepository EmployeesRepository { get; }
    Task<int> SaveChangesAsync();

}
}