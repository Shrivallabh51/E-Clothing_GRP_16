using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class User
    {
        public User()
        {
            Addresses = new HashSet<Address>();
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
            Payments = new HashSet<Payment>();
            Products = new HashSet<Product>();
        }

        public string Username { get; set; } = null!;
        public int UserId { get; set; }
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Mobile { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public int? RId { get; set; }
        public string Status { get; set; } = null!;

        public virtual Role? RIdNavigation { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
