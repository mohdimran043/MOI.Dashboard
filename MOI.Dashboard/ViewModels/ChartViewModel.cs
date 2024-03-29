﻿using System.Collections.Generic;

namespace MOI.Patrol.ViewModels
{
    public class ChartViewModel
    {
        public string[] chartlabel { get; set; }
        public List<ChartSubDataViewModel> chartsubdta { get; set; }
    }

    public class ChartSubDataViewModel
    {
        public string label { get; set; }
        public string[] data { get; set; }

        public string backgroundcolor { get; set; }
    }
}
