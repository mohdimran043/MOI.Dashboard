using MOI.Patrol.ORM_Auth;

namespace MOI.Patrol.Interface
{

    public interface IUserRepository
    {
        bool ValidateCredentials(string username, string password);

        bool ValidateUser(string username);

        MoiUser FindBySubjectId(int subjectId);

        MoiUser FindByUsername(string username);
    }

}
