using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace MOI.Patrol.Helpers
{
    public class NtlmAndAnonymousSetupMiddleware
    {
        private readonly RequestDelegate next;

        public NtlmAndAnonymousSetupMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.User.Identity.IsAuthenticated || (null != context.Request.Path && context.Request.Path.ToString().ToLower().Contains("signalr")))
            {
                await next(context);
                return;
            }

            await context.ChallengeAsync("Windows");
        }

    }
}
