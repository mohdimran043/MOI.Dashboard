
using Microsoft.Extensions.Configuration;
using MOI.Patrol.ORM_Auth;
using System;
using System.Collections.Generic;
using System.Linq;


namespace MOI.Patrol.BusinessLayer
{
    public class Handler_Auth
    {
        private MOI_ApplicationPermissionContext sc;
        int applicationId;
        public Handler_Auth(IConfiguration _configuration)
        {

            applicationId = Convert.ToInt32(_configuration["Application:Id"]);
        }
        public bool GetUser(string domainUser)
        {
            bool exists = false;
            try
            {

                using (sc = new MOI_ApplicationPermissionContext())
                {
                    exists = (from r in sc.MoiUser
                              where r.DomainUser == domainUser && r.ApplicationId == applicationId && r.IsActive == true
                              select r.DomainUser).ToList().Count > 0 ? true : false;
                }
            }
            catch (Exception)
            {
            }

            return exists;
        }
        public bool CheckIfUserHasAccessOnApplication(string domainUser)
        {
            bool exists = false;
            try
            {

                using (sc = new MOI_ApplicationPermissionContext())
                {
                    exists = (from r in sc.MoiUser
                              where r.DomainUser == domainUser && r.ApplicationId == applicationId && r.IsActive == true
                              select r.DomainUser).ToList().Count > 0 ? true : false;
                }
            }
            catch (Exception ex)
            {
            }

            return exists;
        }
        public List<string> GetRolesByUsrId(string domainUser)
        {
            List<string> roles = new List<string>();

            try
            {

                using (sc = new MOI_ApplicationPermissionContext())
                {
                    roles = (from rt in sc.MoiUserRoleMap
                             join r in sc.MoiUser on rt.UserId equals r.Id
                             join ar in sc.MoiApplicationRole on rt.Id equals ar.Id
                             where r.IsActive == true && r.DomainUser == domainUser && r.ApplicationId == applicationId && ar.IsDeleted == false
                             select ar.Name).ToList();
                }
            }
            catch (Exception)
            {
            }

            return roles;
        }
        public List<MoiApplication> FetchApplicationList()
        {
            List<MoiApplication> moiApplicaiton = new List<MoiApplication>();
            try
            {
                using (sc = new MOI_ApplicationPermissionContext())
                {
                    moiApplicaiton = (from rt in sc.MoiApplication
                                      where rt.IsDeleted != true
                                      select rt).ToList();
                }
            }
            catch (Exception)
            {

            }

            return moiApplicaiton;
        }
        public bool PostAddUpdateApplication(int applicationId, string applicationName, string loggedInUser)
        {
            bool isUpdated = false;
            using (sc = new MOI_ApplicationPermissionContext())
            {
                var app = sc.MoiApplication.Where(a => a.Id == applicationId).FirstOrDefault();
                if (app != null)
                {
                    app.Name = applicationName;
                    app.CreatedBy = loggedInUser;
                    app.CreatedDate = DateTime.Now;
                }
                else
                {
                    sc.MoiApplication.Add(new MoiApplication
                    {
                        Name = applicationName,
                        CreatedBy = loggedInUser,
                        CreatedDate = DateTime.Now,
                        IsDeleted = false
                    });
                }
                sc.SaveChanges();
                isUpdated = true;
            }
            return isUpdated;
        }
        public bool PostDeleteApplication(int applicationId)
        {
            bool isDeleted = false;
            using (sc = new MOI_ApplicationPermissionContext())
            {
                var app = sc.MoiApplication.Where(a => a.Id == applicationId).FirstOrDefault();
                if (app != null)
                {
                    app.IsDeleted = true;
                    sc.SaveChanges();
                    isDeleted = true;
                }
            }
            return isDeleted;
        }
        public List<MoiApplicationRole> FetchApplicationRoles(int applicationId)
        {
            List<MoiApplicationRole> moiApplicaiton = new List<MoiApplicationRole>();
            try
            {
                using (sc = new MOI_ApplicationPermissionContext())
                {
                    moiApplicaiton = (from rt in sc.MoiApplicationRole
                                      where rt.IsDeleted != true && rt.ApplicationId == applicationId
                                      select rt).ToList();
                }
            }
            catch (Exception)
            {
            }

            return moiApplicaiton;
        }
        public bool PostDeleteApplicationRole(int roleId)
        {
            bool isDeleted = false;
            using (sc = new MOI_ApplicationPermissionContext())
            {
                var appRole = sc.MoiApplicationRole.Where(a => a.Id == roleId).FirstOrDefault();
                if (appRole != null)
                {
                    appRole.IsDeleted = true;
                    sc.SaveChanges();
                    isDeleted = true;
                }
            }
            return isDeleted;
        }
        public bool PostAddUpdateApplicationRole(int roleId, string roleName, string loggedInUser)
        {
            bool isUpdated = false;
            using (sc = new MOI_ApplicationPermissionContext())
            {
                var app = sc.MoiApplicationRole.Where(a => a.Id == roleId).FirstOrDefault();
                if (app != null)
                {
                    app.Name = roleName;
                    app.CreatedBy = loggedInUser;
                    app.CreatedDate = DateTime.Now;
                }
                else
                {
                    sc.MoiApplication.Add(new MoiApplication
                    {
                        Name = roleName,
                        CreatedBy = loggedInUser,
                        CreatedDate = DateTime.Now,
                        IsDeleted = false
                    });
                }
                sc.SaveChanges();
                isUpdated = true;
            }
            return isUpdated;
        }
        public List<Object> FetchUsersByApplicationId(int applicationId)
        {
            List<Object> result = new List<Object>();
            try
            {
                using (sc = new MOI_ApplicationPermissionContext())
                {

                    var moiUsers = sc.MoiUser.Where(a => a.ApplicationId.Equals(applicationId) && a.IsActive != false).ToList();
                    moiUsers.ForEach(mUser =>
                    {
                        result.Add(FetchUserDetailByApplicationId(applicationId, mUser.DomainUser));
                    });
                }
            }
            catch (Exception)
            {
            }

            return result;
        }

        public Object FetchUserDetailByApplicationId(int applicationId, string domainUser)
        {
            Object result = new Object();
            Object userRoles = new Object();
            try
            {
                using (sc = new MOI_ApplicationPermissionContext())
                {
                    userRoles = (from rt in sc.MoiUserRoleMap
                                 join r in sc.MoiUser on rt.UserId equals r.Id
                                 join ar in sc.MoiApplicationRole on rt.Id equals ar.Id
                                 where r.IsActive == true && r.DomainUser == domainUser && r.ApplicationId == applicationId && ar.IsDeleted == false && rt.IsActive == true
                                 select new
                                 {
                                     Name = ar.Name,
                                     Id = ar.Id
                                 }).ToList();
                    var moiUser = sc.MoiUser.Where(a => a.DomainUser.Equals(domainUser)).FirstOrDefault();
                    result = new
                    {
                        Id = moiUser.Id,
                        Name = moiUser.Name,
                        DomainUser = moiUser.DomainUser,
                        CreatedBy = moiUser.CreatedBy,
                        CreatedDate = moiUser.CreatedDate,
                        ModifiedDate = moiUser.ModifiedDate,
                        ModifiedBy = moiUser.ModifiedBy,
                        Roles = userRoles
                    };
                }
            }
            catch (Exception)
            {
            }

            return result;
        }
        public bool PostDeleteApplicationUser(int applicationId, string domainUser)
        {
            bool isDeleted = false;
            using (sc = new MOI_ApplicationPermissionContext())
            {
                var appRole = sc.MoiUser.Where(a => a.ApplicationId == applicationId && a.DomainUser == domainUser).FirstOrDefault();
                if (appRole != null)
                {
                    appRole.IsActive = false;
                    sc.SaveChanges();
                    isDeleted = true;
                }
            }
            return isDeleted;
        }
        public bool PostUpdateApplicationUser(int applicationId, string domainUser, string displayName, List<int> rolesId, string loggedInUser)
        {
            bool isUpdated = false;
            List<int> newRoleIds = rolesId;
            using (sc = new MOI_ApplicationPermissionContext())
            {
                var moiUser = sc.MoiUser.Where(a => a.ApplicationId == applicationId && a.DomainUser == domainUser).FirstOrDefault();
                if (moiUser != null)
                {
                    if (moiUser.Name != displayName)
                    {
                        moiUser.Name = displayName;
                        sc.SaveChanges();
                    }
                    List<int> oldRoleIds = sc.MoiUserRoleMap.Where(ur => ur.UserId.Equals(moiUser.Id) && ur.IsActive.Equals(true)).Select(a => a.RoleId).ToList();
                    List<int> idsToBeDeleted = oldRoleIds.Except(rolesId).ToList();
                    newRoleIds = rolesId.Except(oldRoleIds).ToList();
                    idsToBeDeleted.ForEach(rId =>
                    {
                        var roleMap = sc.MoiUserRoleMap.Where(ur => ur.UserId.Equals(moiUser.Id) && ur.RoleId.Equals(rId)).FirstOrDefault();
                        roleMap.IsActive = false;
                        sc.SaveChanges();
                    });
                }
                else
                {
                    sc.MoiUser.Add(new MoiUser()
                    {
                        Name = displayName,
                        DomainUser = domainUser,
                        CreatedBy = loggedInUser,
                        CreatedDate = DateTime.Now,
                        ModifiedBy = loggedInUser,
                        ModifiedDate = DateTime.Now
                    });
                    sc.SaveChanges();
                    moiUser = sc.MoiUser.Where(a => a.ApplicationId == applicationId && a.DomainUser == domainUser).FirstOrDefault();
                }
                if (moiUser != null && newRoleIds.Count > 0)
                {
                    newRoleIds.ForEach(rId =>
                    {
                        if (sc.MoiUserRoleMap.Where(ur => ur.UserId.Equals(moiUser.Id) && ur.RoleId.Equals(rId)).Count() == 0)
                        {
                            sc.MoiUserRoleMap.Add(new MoiUserRoleMap
                            {
                                RoleId = rId,
                                UserId = moiUser.Id,
                                IsActive = true,
                                CreatedDate = DateTime.Now,
                                ModifiedDate = DateTime.Now,
                                CreatedBy = loggedInUser,
                                ModifiedBy = loggedInUser
                            });
                        }
                        else
                        {
                            var roleMap = sc.MoiUserRoleMap.Where(ur => ur.UserId.Equals(moiUser.Id) && ur.RoleId.Equals(rId)).FirstOrDefault();
                            roleMap.IsActive = true;
                           
                        }

                    });
                    sc.SaveChanges();
                }
                isUpdated = true;
            }


            return isUpdated;
        }
    }
}
