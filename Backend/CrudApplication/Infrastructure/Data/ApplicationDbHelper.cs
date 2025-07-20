using Domain.Entities;

namespace Infrastructure.Data
{
    public static class ApplicationDbHelper
    {
        public static void SeedDb(ApplicationDbContext db)
        {
            if (!db.employees.Any())
            {
                db.Add(new Employee
                {
                    Id = 1,
                    FirstName = "Muhammad",
                    LastName="Samy",
                    Email="Muhammad@gmail.com",
                    Position="Full Stack Developer"
                });

                db.Add(new Employee
                {
                    Id = 2,
                    FirstName = "Ramy",
                    LastName="Ahmed",
                    Email="Ramy@gmail.com",
                    Position="HR"
                });

                db.Add(new Employee
                {
                    Id = 3,
                    FirstName = "Emad",
                    LastName="Ali",
                    Email="Emad@gmail.com",
                    Position="Accountant"
                });

                db.Add(new Employee
                {
                    Id = 4,
                    FirstName = "Maged",
                    LastName="Said",
                    Email="Maged@gmail.com",
                    Position="DevOps Engineer"
                });

                db.Add(new Employee
                {
                    Id = 5,
                    FirstName = "Roger",
                    LastName="Alen",
                    Email="Roger@gmail.com",
                    Position="Project Manager"
                });

                db.Add(new Employee
                {
                    Id = 6,
                    FirstName = "Erick",
                    LastName="Arron",
                    Email="Erick@gmail.com",
                    Position="IT Manager"
                });

                db.SaveChanges();
            }
        }
    }
}
