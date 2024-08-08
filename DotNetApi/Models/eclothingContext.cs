using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DotNetApi.Models
{
    public partial class eclothingContext : DbContext
    {
        public eclothingContext()
        {
        }

        public eclothingContext(DbContextOptions<eclothingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=password;database=eclothing", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("address");

                entity.HasIndex(e => e.MobileNumber, "MobileNum")
                    .IsUnique();

                entity.HasIndex(e => e.UserId, "user_Id");

                entity.Property(e => e.AddressId).HasColumnName("Address_Id");

                entity.Property(e => e.City)
                    .HasMaxLength(200)
                    .HasColumnName("city");

                entity.Property(e => e.FullName).HasMaxLength(200);

                entity.Property(e => e.MobileNumber).HasMaxLength(100);

                entity.Property(e => e.Pincode).HasColumnName("pincode");

                entity.Property(e => e.State)
                    .HasMaxLength(200)
                    .HasColumnName("state");

                entity.Property(e => e.Street).HasMaxLength(200);

                entity.Property(e => e.UserId).HasColumnName("user_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("address_ibfk_1");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("carts");

                entity.HasIndex(e => e.PId, "p_id");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.CartId).HasColumnName("cart_id");

                entity.Property(e => e.PId).HasColumnName("p_id");

                entity.Property(e => e.StockQty).HasColumnName("Stock_Qty");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.PIdNavigation)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.PId)
                    .HasConstraintName("carts_ibfk_2");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("carts_ibfk_1");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CatId)
                    .HasName("PRIMARY");

                entity.ToTable("category");

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.CatName)
                    .HasMaxLength(100)
                    .HasColumnName("Cat_Name");

                entity.Property(e => e.Status)
                    .HasMaxLength(100)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.HasIndex(e => e.UserId, "User_id");

                entity.Property(e => e.OrderId).HasColumnName("Order_id");

                entity.Property(e => e.Price).HasColumnType("float(9,2)");

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.Property(e => e.TotalAmount)
                    .HasColumnType("float(9,2)")
                    .HasColumnName("Total_Amount");

                entity.Property(e => e.UserId).HasColumnName("User_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("orders_ibfk_1");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.OrderDetailsId)
                    .HasName("PRIMARY");

                entity.ToTable("order_details");

                entity.HasIndex(e => e.OrderId, "fk_order");

                entity.HasIndex(e => e.PId, "p_id");

                entity.Property(e => e.OrderDetailsId).HasColumnName("order_Details_Id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.PId).HasColumnName("p_id");

                entity.Property(e => e.Price)
                    .HasColumnType("float(9,2)")
                    .HasColumnName("price");

                entity.Property(e => e.StockQty).HasColumnName("Stock_Qty");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("fk_order");

                entity.HasOne(d => d.PIdNavigation)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.PId)
                    .HasConstraintName("order_details_ibfk_2");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("payment");

                entity.HasIndex(e => e.TransactionId, "Transaction_Id_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.UserId, "User_Id");

                entity.HasIndex(e => e.OrderId, "fk_payment_order");

                entity.Property(e => e.PaymentId).HasColumnName("Payment_Id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.PaymentMethodName)
                    .HasMaxLength(100)
                    .HasColumnName("Payment_Method_Name");

                entity.Property(e => e.PaymentStatus)
                    .HasMaxLength(100)
                    .HasColumnName("Payment_Status");

                entity.Property(e => e.Total)
                    .HasMaxLength(100)
                    .HasColumnName("total");

                entity.Property(e => e.TransactionId).HasColumnName("Transaction_Id");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("fk_payment_order");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("payment_ibfk_2");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.PId)
                    .HasName("PRIMARY");

                entity.ToTable("product");

                entity.HasIndex(e => e.UserId, "User_Id");

                entity.HasIndex(e => e.CatId, "cat_id");

                entity.Property(e => e.PId).HasColumnName("p_id");

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.Price)
                    .HasColumnType("float(9,2)")
                    .HasColumnName("price");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(200)
                    .HasColumnName("product_Name");

                entity.Property(e => e.StockQty).HasColumnName("Stock_Qty");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CatId)
                    .HasConstraintName("product_ibfk_1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("product_ibfk_2");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("review");

                entity.HasIndex(e => e.PId, "P_id");

                entity.HasIndex(e => e.UserId, "user_Id");

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.PId).HasColumnName("P_id");

                entity.Property(e => e.UserId).HasColumnName("user_Id");

                entity.HasOne(d => d.PIdNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.PId)
                    .HasConstraintName("review_ibfk_2");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("review_ibfk_1");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.RId)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.HasIndex(e => e.RName, "r_name")
                    .IsUnique();

                entity.Property(e => e.RId)
                    .ValueGeneratedNever()
                    .HasColumnName("r_id");

                entity.Property(e => e.RName)
                    .HasMaxLength(100)
                    .HasColumnName("r_name");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Mobile, "mobile")
                    .IsUnique();

                entity.HasIndex(e => e.RId, "r_id");

                entity.HasIndex(e => e.Username, "username")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .HasColumnName("firstName");

                entity.Property(e => e.Gender)
                    .HasMaxLength(100)
                    .HasColumnName("gender");

                entity.Property(e => e.LastName).HasMaxLength(100);

                entity.Property(e => e.Mobile)
                    .HasMaxLength(100)
                    .HasColumnName("mobile");

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .HasColumnName("password");

                entity.Property(e => e.RId).HasColumnName("r_id");

                entity.Property(e => e.Status)
                    .HasMaxLength(100)
                    .HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .HasColumnName("username");

                entity.HasOne(d => d.RIdNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RId)
                    .HasConstraintName("users_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
