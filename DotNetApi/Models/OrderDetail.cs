using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class OrderDetail
    {
        public int OrderDetailsId { get; set; }
        public int? OrderId { get; set; }
        public int? PId { get; set; }
        public int StockQty { get; set; }
        public float Price { get; set; }

        public virtual Order? Order { get; set; }
        public virtual Product? PIdNavigation { get; set; }
    }
}
