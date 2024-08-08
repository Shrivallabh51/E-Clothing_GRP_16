using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public int? OrderId { get; set; }
        public int? UserId { get; set; }
        public string Total { get; set; } = null!;
        public string PaymentMethodName { get; set; } = null!;
        public string PaymentStatus { get; set; } = null!;
        public int TransactionId { get; set; }

        public virtual Order? Order { get; set; }
        public virtual User? User { get; set; }
    }
}
