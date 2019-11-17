using Microsoft.EntityFrameworkCore;

namespace MOI.Patrol.ORM_Auth
{
    public partial class MOI_ApplicationPermissionContext : DbContext
    {
        public MOI_ApplicationPermissionContext()
        {
        }

        public MOI_ApplicationPermissionContext(DbContextOptions<MOI_ApplicationPermissionContext> options)
            : base(options)
        {
        }

        public virtual DbSet<MoiApplication> MoiApplication { get; set; }
        public virtual DbSet<MoiApplicationRole> MoiApplicationRole { get; set; }
        public virtual DbSet<MoiUser> MoiUser { get; set; }
        public virtual DbSet<MoiUserRoleMap> MoiUserRoleMap { get; set; }
        public virtual DbSet<OpenIddictApplications> OpenIddictApplications { get; set; }
        public virtual DbSet<OpenIddictAuthorizations> OpenIddictAuthorizations { get; set; }
        public virtual DbSet<OpenIddictScopes> OpenIddictScopes { get; set; }
        public virtual DbSet<OpenIddictTokens> OpenIddictTokens { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //if (!optionsBuilder.IsConfigured)
        //    //{
        //    //    // IConfigurationRoot configuration = new ConfigurationBuilder()
        //    //    //.SetBasePath(Directory.GetCurrentDirectory())
        //    //    //.AddJsonFile("appsettings.json")
        //    //    //.Build();

        //    //    var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        //    //    IConfigurationRoot configuration = new ConfigurationBuilder()
        //    //                                    .SetBasePath(Directory.GetCurrentDirectory())
        //    //                                    .AddJsonFile("appsettings.json", optional: false)
        //    //                                    .AddJsonFile($"appsettings.{envName}.json", optional: false)
        //    //                                     .Build();
        //    //    var connectionString = configuration.GetConnectionString("AuthenticationConnection");
        //    //    optionsBuilder.UseNpgsql(connectionString);
        //    //}
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MoiApplication>(entity =>
            {
                entity.ToTable("MOI_Application");

                entity.Property(e => e.AccessType)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.ApplicationUrl)
                    .HasColumnName("ApplicationURL")
                    .HasMaxLength(200);

                entity.Property(e => e.ClientKey).HasColumnType("character varying");

                entity.Property(e => e.ClientSecret).HasColumnType("character varying");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasColumnType("character varying");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<MoiApplicationRole>(entity =>
            {
                entity.ToTable("MOI_ApplicationRole");

                entity.Property(e => e.AccessType)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.CreatedBy).HasMaxLength(30);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<MoiUser>(entity =>
            {
                entity.ToTable("MOI_User");

                entity.Property(e => e.CreatedBy).HasMaxLength(30);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.DomainUser)
                    .IsRequired()
                    .HasColumnName("Domain_User")
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(30);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<MoiUserRoleMap>(entity =>
            {
                entity.ToTable("MOI_UserRoleMap");

                entity.Property(e => e.CreatedBy).HasMaxLength(30);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.ModifiedBy).HasMaxLength(30);

                entity.Property(e => e.ModifiedDate).HasColumnType("date");
            });


            modelBuilder.Entity<OpenIddictApplications>(entity =>
            {
                /*
                 * Added to resolve issue System.InvalidOperationException: Cannot use table 'OpenIddictApplications' for entity type
                 * 'OpenIddictApplication' since it is being used for entity type 'OpenIddictApplications'
                 * and there is no relationship between their primary keys.
                 */
                entity.ToTable("openiddictapplications");

                entity.Property(e => e.Id)
                    .HasMaxLength(450)
                    .ValueGeneratedNever();

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.Property(e => e.Type).IsRequired();
            });

            modelBuilder.Entity<OpenIddictAuthorizations>(entity =>
            {
                /*
                 * System.InvalidOperationException: Cannot use table 'OpenIddictAuthorizations' for entity type 'OpenIddictAuthorization'
                 * since it is being used for entity type 'OpenIddictAuthorizations' and there is no relationship between their primary keys.
                 */
                entity.ToTable("openiddictauthorizations");

                entity.Property(e => e.Id)
                    .HasMaxLength(450)
                    .ValueGeneratedNever();

                entity.Property(e => e.ApplicationId).HasMaxLength(450);

                entity.Property(e => e.Status).IsRequired();

                entity.Property(e => e.Subject).IsRequired();

                entity.Property(e => e.Type).IsRequired();

                entity.HasOne(d => d.Application)
                    .WithMany(p => p.OpenIddictAuthorizations)
                    .HasForeignKey(d => d.ApplicationId)
                    .HasConstraintName("FK_OpenIddictAuthorizations_OpenIddictApplications_ApplicationI");
            });

            modelBuilder.Entity<OpenIddictScopes>(entity =>
            {
                /*
                 * System.InvalidOperationException: Cannot use table 'OpenIddictScopes' for entity type 'OpenIddictScope' 
                 * since it is being used for entity type 'OpenIddictScopes' and there is no relationship between their primary keys.
                 */
                entity.ToTable("openiddictscopes");

                entity.Property(e => e.Id)
                    .HasMaxLength(450)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<OpenIddictTokens>(entity =>
            {
                /*
                 * System.InvalidOperationException: Cannot use table 'OpenIddictTokens' for entity type 'OpenIddictToken' 
                 * since it is being used for entity type 'OpenIddictTokens' and there is no relationship between their primary keys.
                 */
                entity.ToTable("openiddicttokens");

                entity.Property(e => e.Id)
                    .HasMaxLength(450)
                    .ValueGeneratedNever();

                entity.Property(e => e.ApplicationId).HasMaxLength(450);

                entity.Property(e => e.AuthorizationId).HasMaxLength(450);

                entity.Property(e => e.CreationDate).HasColumnType("timestamp(6) with time zone");

                entity.Property(e => e.ExpirationDate).HasColumnType("timestamp(6) with time zone");

                entity.Property(e => e.ReferenceId).HasMaxLength(450);

                entity.Property(e => e.Subject).IsRequired();

                entity.Property(e => e.Type).IsRequired();

                entity.HasOne(d => d.Application)
                    .WithMany(p => p.OpenIddictTokens)
                    .HasForeignKey(d => d.ApplicationId);

                entity.HasOne(d => d.Authorization)
                    .WithMany(p => p.OpenIddictTokens)
                    .HasForeignKey(d => d.AuthorizationId);
            });

            modelBuilder.HasSequence("MOI_UserRoleMap_Id_seq");
        }
    }
}
