using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MOI.Patrol.BusinessLayer;
using System;

namespace MOI.Patrol.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class CustomAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        // private readonly string _someFilterParameter;

        //public CustomAuthorizeAttribute(string someFilterParameter)
        //{
        //    _someFilterParameter = someFilterParameter;
        //}

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            var isAuthorized = false;
            UserRepository userRep = new UserRepository();
            if (!user.Identity.IsAuthenticated)
            {
                // it isn't needed to set unauthorized result 
                // as the base class already requires the user to be authenticated
                // this also makes redirect to a login page work properly
                // context.Result = new UnauthorizedResult();
                return;
            }
            isAuthorized = userRep.ValidateUser(Utilities.RemoveDomainFromUserName(user.Identity.Name));
            if (!isAuthorized)
            {
                context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
                return;
            }
        }
    }
}
