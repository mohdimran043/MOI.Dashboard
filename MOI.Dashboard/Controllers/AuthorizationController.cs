using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MOI.Patrol.BusinessLayer;
using MOI.Patrol.Entities;
using Newtonsoft.Json;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860


namespace AssetManagement.Controllers
{
    [Authorize]
    public class AuthorizationController : Controller
    {
        //private Handler_UserConfiguration handlerUserConfig = new Handler_UserConfiguration();
        private Handler_Auth handlerAuth;


        public IConfiguration configuration { get; }
        public int applicationId { get; set; }

        //private readonly IOptions<IdentityOptions> _identityOptions;
        //private readonly SignInManager<ApplicationUser> _signInManager;
        //private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthorizationController(
             //IOptions<IdentityOptions> identityOptions,
             //SignInManager<ApplicationUser> signInManager,
             //UserManager<ApplicationUser> userManager, 
             IConfiguration _configuration, IHttpContextAccessor httpContextAccessor)
        {
            //_identityOptions = identityOptions;
            //_signInManager = signInManager;
            //_userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            configuration = _configuration;
            handlerAuth = new Handler_Auth(configuration);

        }
        //public AuthorizationController(IConfiguration _configuration)
        //{
        //    configuration = _configuration;
        //    applicationId = Convert.ToInt32(configuration["Application:Id"]);
        //}
        [HttpGet("~/api/fetchusername")]
        public string FetchLoggedInUserName()
        {
            // string userName = Utilities.RemoveDomainFromUserName(HttpContext.User.Identity.Name.ToLower());
            string userName = "mimran";
            return userName;
        }

        [HttpPost("~/connect/token")]
        [Produces("application/json")]
        public IActionResult Exchange(OpenIdConnectRequest request)
        {
            if (request.IsPasswordGrantType() || true)
            {
                //string userName = Utilities.RemoveDomainFromUserName(HttpContext.User.Identity.Name.ToLower());
                string userName = "mimran";
                string displayName = userName;
                //if (string.IsNullOrEmpty(userName) || !handlerAuth.CheckIfUserHasAccessOnApplication(userName))
                //{
                //    return BadRequest(new OpenIdConnectResponse
                //    {
                //        Error = OpenIdConnectConstants.Errors.AccessDenied,
                //        ErrorDescription = "Unauthorized Access"
                //    });
                //}
                User _user = new User();
                _user.Name = displayName;
                _user.Userid = 6;
                _user.Username = userName;
                if (_user == null)
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.AccessDenied,
                        ErrorDescription = "Unauthorized Access"
                    });
                }
                //  var ticket =  CreateTicketAsync(request, _user);

                return Ok(CreateTicketAsync(request, _user));

            }
            else if (request.IsRefreshTokenGrantType())
            {
                string userName = "mimran";
                string displayName = userName;
                IdentityUser user = new IdentityUser();
                user.Email = "admin";
                user.UserName = "admin";
                bool hasAccess = handlerAuth.CheckIfUserHasAccessOnApplication(user.UserName);
                if (!hasAccess)
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.AccessDenied,
                        ErrorDescription = "Unauthorized Access"
                    });
                }
                User _user = new User();
                _user.Name = displayName;
                _user.Userid = 6;
                _user.Username = userName;
                // Create a new authentication ticket, but reuse the properties stored
                // in the refresh token, including the scopes originally granted.
                //    var ticket =  CreateTicketAsync(request, _user);
                return Ok(CreateTicketAsync(request, _user));
            }
            return BadRequest(new OpenIdConnectResponse
            {
                Error = OpenIdConnectConstants.Errors.UnsupportedGrantType,
                ErrorDescription = "The specified grant type is not supported"
            });
        }

        private AuthenticationTicket CreateTicketAsync(OpenIdConnectRequest request, User _user)
        {
            var identity = new ClaimsIdentity(
                OpenIddictServerDefaults.AuthenticationScheme,
                OpenIdConnectConstants.Claims.Name,
                OpenIdConnectConstants.Claims.Role);

            identity.AddClaim(OpenIdConnectConstants.Claims.Subject,
               _user.Userid.ToString(),
                OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim(OpenIdConnectConstants.Claims.Name, _user.Username,
                OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim("userName", _user.Username,
       OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim("empDisplayName", _user.Name,
             OpenIdConnectConstants.Destinations.AccessToken);
            //   identity.AddClaim("mNO", "",
            // OpenIdConnectConstants.Destinations.AccessToken);
            //   identity.AddClaim("empDeptCode", "",
            //OpenIdConnectConstants.Destinations.AccessToken);
            //   identity.AddClaim("empDeptName", "",
            //OpenIdConnectConstants.Destinations.AccessToken);

            List<string> userRoles = handlerAuth.GetRolesByUsrId(_user.Username);
            foreach (var role in userRoles)
            {
                identity.AddClaim(ClaimTypes.Role, role,
                   OpenIdConnectConstants.Destinations.AccessToken);
            }

            //      identity.AddClaim("configuration", JsonConvert.SerializeObject(handlerUserConfig.GetUserConfigurationByRoles(userRoles)),
            //OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim("role", JsonConvert.SerializeObject(userRoles.ToArray()),
      OpenIdConnectConstants.Destinations.AccessToken);

            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, new AuthenticationProperties(), OpenIddictServerDefaults.AuthenticationScheme);
            ticket.SetScopes(new[]
            {
                    OpenIdConnectConstants.Scopes.OpenId,
                    OpenIdConnectConstants.Scopes.Email,
                    OpenIdConnectConstants.Scopes.OfflineAccess,
                    OpenIddictConstants.Scopes.Roles

            }.Intersect(request.GetScopes()));
            foreach (var claim in ticket.Principal.Claims)
            {
                //// Never include the security stamp in the access and identity tokens, as it's a secret value.
                //if (claim.Type == _identityOptions.Value.ClaimsIdentity.SecurityStampClaimType)
                //    continue;


                var destinations = new List<string> { OpenIdConnectConstants.Destinations.AccessToken };
                destinations.Add(OpenIdConnectConstants.Destinations.IdentityToken);

                claim.SetDestinations(destinations);
            }



            return ticket;
        }
    }
}
