using System;

namespace MOI.Patrol.ORM_Auth
{
    public partial class MoiApplication
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AccessType { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ApplicationUrl { get; set; }
        public string ClientKey { get; set; }
        public string ClientSecret { get; set; }
    }
}
