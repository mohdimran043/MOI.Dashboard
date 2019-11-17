namespace MOI.Patrol.Helpers
{
    public static class PatrolPGSQLConstants
    {
        public const string ROLE_MANAGE_CHART = "ManageCharts";
        public const string ROLE_MANAGE_ORGANISATION = "ManageOrganization";
        public const string ROLE_MANAGE_OPERATION = "ManageOperation";
        public const string ROLE_MANAGE_DISPATCHER = "ManageDispatcher";
        public const string ROLE_MANAGE_MAINTAINANCE = "ManageMaintainance";
        public const string ROLE_MANAGE_SCHEDULING = "ManageScheduling";
        public const string SCHEMA = "Public";
        public const string PGSQL_FETCHEMPLOYEESTATBYAHWAL = "FetchEmployeeStatsByAhwal";
        public const string PGSQL_FETCHINCIDENTSBYAHWAL = "FetchIncidentCount";
        public const string PGSQL_FETCHPATROLSTATUSBYAHWAL = "FetchPatrolStatusByAhwal";


        public const string PGSQL_ACCESORIES_FETCHASSETS = "fetchaccesoriesassets";
        public const string PGSQL_ACCESORIES_FETCHASSETCONSUMABLE = "fetchaccesoriesconsumableassets";
        public const string PGSQL_ACCESORIES_FETCHASSETNONCONSUMABLE = "fetchaccesoriesnonconsumableassets";
        public const string PGSQL_ACCESORIES_FETCHMODELBYASSET = "fetchaccesoriesmodelbyasset";
        public const string PGSQL_ACCESORIES_FETCHVENDORBYMODEL = "fetchaccesoriesvendorbymodel";
        public const string PGSQL_ACCESORIES_FETCHCONSUMABLEITEMS = "fetchaccesoriesconsumable";
        public const string PGSQL_ACCESORIES_FETCHNONCONSUMABLEITEMS = "fetchaccesoriesnonconsumable";
        public const string PGSQL_ACCESORIES_FETCHNONCONSUMABLEBYSERIAL = "fetchaccesoriesnonconsumablebyserial";
        public const string PGSQL_ACCESORIES_INSERTCONSUMABLE = "insertaccesoriesconsumable";
        public const string PGSQL_ACCESORIES_INSERTNONCONSUMABLE = "insertaccesoriesnonconsumable";
        public const string PGSQL_GENERATESERIALNUMBERFOR_ACCESSORIENONCONSUMABLE = "generateserialnumberforaccessorienonconsumable";

    }
}
