using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MOI.Patrol.BusinessLayer;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MOI.Application.Management.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ManagePermissionController : Controller
    {
        private Handler_Auth handlerAuth;
        private IConfiguration configuration { get; }
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ManagePermissionController(
             IConfiguration _configuration, IHttpContextAccessor httpContextAccessor)
        {

            _httpContextAccessor = httpContextAccessor;
            configuration = _configuration;
            handlerAuth = new Handler_Auth(configuration);

        }

        #region "Application"
        [HttpPost("fetchapplicationlist")]
        public ActionResult FetchApplicationList([FromBody]JObject rqdr)
        {
            return Ok(handlerAuth.FetchApplicationList());
        }
        [HttpPost("addupdateapplication")]
        public ActionResult PostAddUpdateApplication([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            string appName = Convert.ToString(rqdr["appname"]);
            string loggedInUser = Convert.ToString(rqdr["username"]);
            return Ok(handlerAuth.PostAddUpdateApplication(appId, appName, loggedInUser));
        }
        [HttpPost("deleteapplication")]
        #endregion


        #region "ApplicationRole"

        public ActionResult PostDeleteApplication([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            return Ok(handlerAuth.PostDeleteApplication(appId));
        }
        [HttpPost("fetchapplicationroles")]
        public ActionResult FetchApplicationRoles([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            return Ok(handlerAuth.FetchApplicationRoles(appId));
        }
        [HttpPost("deleteapplicationrole")]
        public ActionResult PostDeleteApplicationRole([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["RoleId"]);
            return Ok(handlerAuth.PostDeleteApplicationRole(appId));
        }
        [HttpPost("addupdateapplicationrole")]
        public ActionResult PostAddUpdateApplicationRole([FromBody]JObject rqdr)
        {
            int roleId = Convert.ToInt32(rqdr["roleid"]);
            string roleName = Convert.ToString(rqdr["rolename"]);
            string loggedInUser = Convert.ToString(rqdr["username"]);
            return Ok(handlerAuth.PostAddUpdateApplicationRole(roleId, roleName, loggedInUser));
        }
        [HttpPost("fetchapplicationusers")]
        public ActionResult FetchUsers([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            return Ok(handlerAuth.FetchUsersByApplicationId(appId));
        }

        #endregion

        #region "ApplicationUser"
        [HttpPost("fetchapplicationuserdetail")]
        public ActionResult FetchUserDetail([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            string domainUser = Convert.ToString(rqdr["domainuser"]);
            return Ok(handlerAuth.FetchUserDetailByApplicationId(appId, domainUser));
        }

        [HttpPost("deleteapplicationuserdetail")]
        public ActionResult DeleteApplicationUserDetail([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            string domainUser = Convert.ToString(rqdr["domainuser"]);
            return Ok(handlerAuth.PostDeleteApplicationUser(appId, domainUser));
        }

        [HttpPost("updateapplicationuserdetail")]
        public ActionResult PostUpdateApplicationUser([FromBody]JObject rqdr)
        {
            int appId = Convert.ToInt32(rqdr["applicationid"]);
            List<int> roleIds = JsonConvert.DeserializeObject<List<int>>(Convert.ToString(rqdr["roleids"]));
            string domainUser = Convert.ToString(rqdr["domainuser"]);
            string displayName = Convert.ToString(rqdr["displayname"]);
            string loggedInUser = Convert.ToString(rqdr["username"]);
            return Ok(handlerAuth.PostUpdateApplicationUser(appId, domainUser, displayName, roleIds, loggedInUser));
        }
        #endregion
    }
}
