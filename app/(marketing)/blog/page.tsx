import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Blog | Debredamo Hotel",
  description:
    "Read the latest news, travel tips, and insights about Addis Ababa and Ethiopian hospitality from Debredamo Hotel.",
};

// Mock blog posts - Replace with actual database query
const mockBlogPosts = [
  {
    id: "1",
    slug: "welcome-to-debredamo-hotel",
    title: "Welcome to Debredamo Hotel",
    excerpt:
      "Discover what makes our hotel a premier destination in Addis Ababa. From luxury accommodations to exceptional service, learn about the Debredamo experience.",
    content: "",
    featuredImage: "/images/blog/welcome.jpg",
    author: "Sarah Johnson",
    category: "Hotel News",
    publishedAt: new Date("2024-01-15"),
    readTime: 5,
  },
  {
    id: "2",
    slug: "top-attractions-addis-ababa",
    title: "Top 10 Attractions to Visit in Addis Ababa",
    excerpt:
      "Planning your trip to Ethiopia's capital? Here's our curated list of must-visit attractions, from historical sites to modern landmarks.",
    content: "",
    featuredImage: "/images/blog/attractions.jpg",
    author: "Michael Tesfaye",
    category: "Travel Guide",
    publishedAt: new Date("2024-01-10"),
    readTime: 8,
  },
  {
    id: "3",
    slug: "ethiopian-coffee-ceremony",
    title: "Experience the Traditional Ethiopian Coffee Ceremony",
    excerpt:
      "Coffee originated in Ethiopia, and the traditional coffee ceremony is an integral part of the culture. Learn about this beautiful ritual.",
    content: "",
    featuredImage: "/images/blog/coffee.jpg",
    author: "Alem Bekele",
    category: "Culture",
    publishedAt: new Date("2024-01-05"),
    readTime: 6,
  },
  {
    id: "4",
    slug: "business-travel-tips-addis-ababa",
    title: "Essential Tips for Business Travelers in Addis Ababa",
    excerpt:
      "Traveling to Addis Ababa for business? Here are our top tips to make your trip productive and comfortable.",
    content: "",
    featuredImage: "/images/blog/business.jpg",
    author: "David Wilson",
    category: "Business Travel",
    publishedAt: new Date("2023-12-28"),
    readTime: 7,
  },
  {
    id: "5",
    slug: "ethiopian-cuisine-guide",
    title: "A Guide to Ethiopian Cuisine",
    excerpt:
      "Explore the rich flavors of Ethiopian food. From injera to doro wat, discover the dishes that make Ethiopian cuisine unique.",
    content: "",
    featuredImage: "/images/blog/cuisine.jpg",
    author: "Alem Bekele",
    category: "Food & Dining",
    publishedAt: new Date("2023-12-20"),
    readTime: 9,
  },
  {
    id: "6",
    slug: "luxury-accommodations-addis-ababa",
    title: "The Rise of Luxury Accommodations in Addis Ababa",
    excerpt:
      "Addis Ababa's hospitality scene is evolving. Explore how luxury hotels are redefining comfort and service in Ethiopia's capital.",
    content: "",
    featuredImage: "/images/blog/luxury.jpg",
    author: "Sarah Johnson",
    category: "Hotel News",
    publishedAt: new Date("2023-12-15"),
    readTime: 6,
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        subtitle="Our Blog"
        title="Stories & Insights"
        description="Travel tips, local culture, and the latest news from Debredamo Hotel"
      />

      <PageSection>
        {/* Featured Post */}
        {mockBlogPosts[0] && (
          <Link href={`/blog/${mockBlogPosts[0].slug}`}>
            <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={mockBlogPosts[0].featuredImage}
                    alt={mockBlogPosts[0].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <Badge className="absolute top-4 left-4 bg-gold-500">
                    Featured
                  </Badge>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <Badge variant="outline">{mockBlogPosts[0].category}</Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(mockBlogPosts[0].publishedAt, "MMM dd, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {mockBlogPosts[0].readTime} min read
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                    {mockBlogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {mockBlogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      {mockBlogPosts[0].author}
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gold-600 hover:text-gold-700"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(post.publishedAt, "MMM dd")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </PageSection>

      {/* Newsletter CTA */}
      <PageSection background="warm">
        <div className=" mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest travel tips, hotel news, and exclusive offers
            delivered to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              required
            />
            <Button type="submit" className="bg-gold-500 hover:bg-gold-600">
              Subscribe
            </Button>
          </form>
        </div>
      </PageSection>
    </>
  );
}
