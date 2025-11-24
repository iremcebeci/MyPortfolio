namespace MyPortfolio.DAL.Entities
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Category { get; set; }
        public string Date { get; set; }
        public string ReadingTime { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string DetailPageUrl { get; set; }
        public string Description { get; set; }
    }
}
