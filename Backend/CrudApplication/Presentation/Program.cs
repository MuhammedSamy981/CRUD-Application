using Application.Interfaces;
using Domain.Interfaces;
using Infrastructure.UnitOfWork;
using Application.Services;
using Infrastructure.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

const string allowLocalhost="AllowLocalhost4200";

#region Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("ApplicationDb"));
#endregion

#region Repositories
builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();
#endregion

#region Unit of work
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
#endregion

#region Services
builder.Services.AddScoped<IEmployeesService,EmployeesService>();
#endregion

#region Controllers
builder.Services.AddControllers();
#endregion

#region Cors
builder.Services.AddCors(options=>
{
  options.AddPolicy(allowLocalhost,builder=>
  {
    builder.WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod();
  });
});
#endregion

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();
app.UseCors(allowLocalhost);


#region Seed database
using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    var db = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    ApplicationDbHelper.SeedDb(db);
}
#endregion

app.Run();

