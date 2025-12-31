import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageSection } from "@/components/shared/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";

// Mock blog post data - Replace with actual database query
const mockBlogPosts = {
  "welcome-to-debredamo-hotel": {
    id: "1",
    slug: "welcome-to-debredamo-hotel",
    title: "Welcome to DEBREDAMO HOTEL",
    excerpt:
      "Discover what makes our hotel a premier destination in Addis Ababa.",
    content: `
      <p>We are thrilled to welcome you to DEBREDAMO HOTEL, Addis Ababa's newest luxury destination. Our hotel represents a perfect blend of modern elegance and traditional Ethiopian hospitality.</p>

      <h2>A Vision of Excellence</h2>
      <p>From the moment you step into our lobby, you'll experience the difference that attention to detail and genuine care can make. Every element of DEBREDAMO HOTEL has been carefully designed to provide you with an unforgettable stay.</p>

      <h2>World-Class Amenities</h2>
      <p>Our 50+ luxury rooms and suites feature state-of-the-art amenities, premium bedding, and stunning views of Addis Ababa. Whether you're here for business or leisure, you'll find everything you need for a comfortable stay.</p>

      <h2>Exceptional Dining</h2>
      <p>Our on-site restaurant offers a culinary journey through Ethiopian and international cuisine. Start your day with our lavish breakfast buffet, enjoy lunch by the pool, or experience fine dining at our signature restaurant.</p>

      <h2>Business Facilities</h2>
      <p>For business travelers, we offer fully equipped meeting rooms, high-speed WiFi throughout the property, and a dedicated business center. Our team is ready to assist with any arrangements you may need.</p>

      <h2>Explore Addis Ababa</h2>
      <p>Located in the heart of the city, DEBREDAMO HOTEL provides easy access to Addis Ababa's top attractions, business districts, and cultural sites. Our concierge team is happy to help you plan your excursions.</p>

      <p>We look forward to welcoming you and making your stay in Addis Ababa truly memorable. Book your reservation today and experience the Debredamo difference.</p>
    `,
    featuredImage: "/images/blog/welcome.jpg",
    author: "Sarah Johnson",
    category: "Hotel News",
    publishedAt: new Date("2024-01-15"),
    readTime: 5,
  },
  // Add more mock posts as needed
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = mockBlogPosts[params.slug as keyof typeof mockBlogPosts];

  if (!post) {
    return {
      title: "Post Not Found | DEBREDAMO HOTEL",
    };
  }

  return {
    title: `${post.title} | DEBREDAMO HOTEL Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts[params.slug as keyof typeof mockBlogPosts];

  if (!post) {
    notFound();
  }

  // Related posts (mock - would be fetched from DB based on category)
  const relatedPosts = [
    {
      slug: "ethiopian-coffee-ceremony",
      title: "Experience the Traditional Ethiopian Coffee Ceremony",
      featuredImage: "/images/blog/coffee.jpg",
      category: "Culture",
    },
    {
      slug: "top-attractions-addis-ababa",
      title: "Top 10 Attractions to Visit in Addis Ababa",
      featuredImage: "/images/blog/attractions.jpg",
      category: "Travel Guide",
    },
    {
      slug: "ethiopian-cuisine-guide",
      title: "A Guide to Ethiopian Cuisine",
      featuredImage: "/images/blog/cuisine.jpg",
      category: "Food & Dining",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] bg-green-900">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8  text-center text-white">
            <Badge className="bg-gold-500 mb-4">{post.category}</Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(post.publishedAt, "MMMM dd, yyyy")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      <PageSection>
        <div className=" mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Share this article
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <Card className="p-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-gold-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-1">
                  {post.author}
                </h4>
                <p className="text-gray-600 text-sm">
                  Content writer and hospitality expert at DEBREDAMO HOTEL.
                  Passionate about sharing insights on Ethiopian culture and
                  travel experiences.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Related Posts */}
      <PageSection background="warm">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group h-full">
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-gold-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <PageSection>
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 md:p-12 text-white text-center  mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience DEBREDAMO HOTEL?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Book your stay and discover the luxury and comfort that awaits you
          </p>
          <a
            href="mailto:reservation@debredamohotel.com?subject=Room%20Booking%20Inquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20booking%20a%20room%20at%20DEBREDAMO%20HOTEL.%0A%0APlease%20let%20me%20know%20about%20availability.%0A%0AThank%20you!"
          >
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600">
              Book Now
            </Button>
          </a>
        </div>
      </PageSection>
    </>
  );
}
