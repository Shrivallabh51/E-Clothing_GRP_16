using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Address
    {
        public int AddressId { get; set; }
        public string FullName { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public int Pincode { get; set; }
        public string MobileNumber { get; set; } = null!;
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
    }
}
