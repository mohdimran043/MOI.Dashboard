using System;

namespace MOI.Patrol.ORM_Auth
{
    public partial class MoiApplicationRole
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ApplicationId { get; set; }
        public bool? IsDeleted { get; set; }
        public string AccessType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
