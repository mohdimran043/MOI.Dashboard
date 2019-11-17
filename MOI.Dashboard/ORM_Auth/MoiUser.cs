using System;

namespace MOI.Patrol.ORM_Auth
{
    public partial class MoiUser
    {
        public int Id { get; set; }
        public int ApplicationId { get; set; }
        public string DomainUser { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Name { get; set; }
    }
}
