using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int? UserId { get; set; }
        public int? PId { get; set; }
        public int StockQty { get; set; }

        public virtual Product? PIdNavigation { get; set; }
        public virtual User? User { get; set; }
    }
}
