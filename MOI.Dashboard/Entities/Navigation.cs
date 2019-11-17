using System.Collections.Generic;

namespace MOI.Patrol.Entities
{
    public class Navigation
    {
        public Navigation()
        {
            children = new List<Navigation>();
        }
        public string id { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public string url { get; set; }
        public string classes { get; set; }
        public string icon { get; set; }
        public List<Navigation> children { get; set; }
    }
}
