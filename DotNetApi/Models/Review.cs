using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Review
    {
        public int? UserId { get; set; }
        public int? PId { get; set; }
        public string Description { get; set; } = null!;
        public int Rating { get; set; }

        public virtual Product? PIdNavigation { get; set; }
        public virtual User? User { get; set; }
    }
}
