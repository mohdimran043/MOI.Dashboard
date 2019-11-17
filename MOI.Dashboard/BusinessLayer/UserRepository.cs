using Microsoft.Extensions.Configuration;
using MOI.Patrol.Interface;
using MOI.Patrol.ORM_Auth;
using System;
using System.IO;
using System.Linq;

namespace MOI.Patrol.BusinessLayer
{
    public class UserRepository : IUserRepository
    {
        MOI_ApplicationPermissionContext dbAuth = new MOI_ApplicationPermissionContext();
        public IConfiguration configuration { get; }
        public int applicationId { get; set; }
        public UserRepository()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                              .SetBasePath(Directory.GetCurrentDirectory())
                              .AddJsonFile("appsettings.json")
                              .Build();

            applicationId = Convert.ToInt32(configuration["Application:Id"]);
        }
        public UserRepository(IConfiguration _configuration)
        {
            // _configuration = configuration;
            configuration = _configuration;
            applicationId = Convert.ToInt32(configuration["Application:Id"]);
        }

        public MoiUser FindBySubjectId(int subjectId)
        {
            return dbAuth.MoiUser.Where(a => a.Id == subjectId && a.ApplicationId == applicationId).FirstOrDefault();
        }

        public MoiUser FindByUsername(string username)
        {
            return dbAuth.MoiUser.Where(a => a.DomainUser == username && a.ApplicationId == applicationId).FirstOrDefault();
        }

        public bool ValidateCredentials(string username, string password)
        {
            return dbAuth.MoiUser.Where(a => a.DomainUser == username && a.ApplicationId == applicationId).Count() > 0 ? true : false;
        }

        public bool ValidateUser(string username)
        {
            return dbAuth.MoiUser.Where(a => a.DomainUser == username && a.ApplicationId == applicationId).Count() > 0 ? true : false;
        }
    }
}
