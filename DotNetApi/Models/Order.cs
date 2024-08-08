using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
            Payments = new HashSet<Payment>();
        }

        public int OrderId { get; set; }
        public int? UserId { get; set; }
        public float Price { get; set; }
        public float TotalAmount { get; set; }
        public string Status { get; set; } = null!;

        public virtual User? User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
