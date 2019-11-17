using AspNet.Security.OAuth.Validation;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MOI.Patrol.ORM_Auth;
using OpenIddict.Abstractions;
using System;
using System.IO;

namespace AssetManagement
{
    public class Startup
    {
        public IConfiguration Configuration { get; }


        public Startup(IWebHostEnvironment env)
        {


            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder()
                                            .SetBasePath(Directory.GetCurrentDirectory())
                                            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                                            .AddJsonFile($"appsettings.{envName}.json", optional: true, reloadOnChange: true);
            Configuration = configurationBuilder.Build();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add cors
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                   builder => builder.WithOrigins("http://localhost:2000").AllowAnyHeader().AllowAnyMethod().AllowCredentials()
                    );
            });

            // Add framework services.
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddSingleton<IConfiguration>(Configuration);
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/datta-able-v7.0.6";
            });


            //        services.AddOpenIddict()
            //.AddCore(options =>
            //{
            //    options.UseEntityFrameworkCore().UseDbContext<MOI_ApplicationPermissionContext>();
            //})
            //.AddServer(options =>
            //{
            //    options.UseMvc();
            //    options.EnableTokenEndpoint("/connect/token");
            //    options.AllowPasswordFlow();
            //    options.AllowRefreshTokenFlow();
            //    options.AcceptAnonymousClients();

            //    options.SetAccessTokenLifetime(TimeSpan.FromMinutes(1));
            //    options.SetRefreshTokenLifetime(TimeSpan.FromMinutes(1));

            //    options.DisableHttpsRequirement(); // Note: Comment this out in production
            //                options.RegisterScopes(
            //        OpenIdConnectConstants.Scopes.OpenId,
            //        OpenIdConnectConstants.Scopes.Email,
            //        OpenIdConnectConstants.Scopes.Phone,
            //        OpenIdConnectConstants.Scopes.Profile,
            //        OpenIdConnectConstants.Scopes.OfflineAccess,
            //        OpenIddictConstants.Scopes.Roles);
            //            })
            //.AddValidation(); 


            services.AddAuthentication(IISDefaults.AuthenticationScheme);

    //        services.AddAuthentication(OAuthValidationDefaults.AuthenticationScheme)
    //.AddOAuthValidation();

            services.AddAuthorization();
            services.AddHttpContextAccessor();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {

            //Configure Cors
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();


            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(60000); // Increase the timeout if angular app is taking longer to startup
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4321"); // Use this instead to use the angular cli server
                }
            });
        }
    }
}
