namespace GBIT.API.Models
{
    public class Item
    {
        public int Id { get; set; }

        public string ItemType { get; set; } = "";

        public string Description { get; set; } = "";

        public string Configuration { get; set; } = "";

        public string Supplier { get; set; } = "";

        public decimal Cost { get; set; }

        public decimal SellingPrice { get; set; }

        public decimal GST { get; set; }

        public decimal GrandTotal { get; set; }
    }
}