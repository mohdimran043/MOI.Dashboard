using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace MOI.Patrol.ORM_Auth
{
    public partial class MOI_ApplicationPermissionContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                IConfigurationRoot configuration = new ConfigurationBuilder()
                                                .SetBasePath(Directory.GetCurrentDirectory())
                                                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                                                 .AddJsonFile($"appsettings.{envName}.json", optional: true, reloadOnChange: true)
                                                 .Build();
                var connectionString = configuration.GetConnectionString("AuthenticationConnection");
                optionsBuilder.UseNpgsql(connectionString);
            }
        }
    }
}
