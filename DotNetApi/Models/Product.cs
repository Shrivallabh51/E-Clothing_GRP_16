using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Product
    {
        public Product()
        {
            Carts = new HashSet<Cart>();
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int PId { get; set; }
        public string ProductName { get; set; } = null!;
        public byte[] Image { get; set; } = null!;
        public int? CatId { get; set; }
        public string Description { get; set; } = null!;
        public float Price { get; set; }
        public int? UserId { get; set; }
        public int StockQty { get; set; }

        public virtual Category? Cat { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
