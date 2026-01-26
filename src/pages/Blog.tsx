import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { blogPosts } from "@/data/posts";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-sacred py-12">
        <div className="container">
          <BreadcrumbNav items={[{ label: "Blog" }]} />
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Blog Religioso
            </h1>
            <p className="text-muted-foreground mt-3">
              Artigos, reflexões e guias sobre a fé católica, oração do terço e 
              espiritualidade. Conteúdo para nutrir sua alma.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container">
          <article className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-3xl overflow-hidden shadow-card">
            <div className="aspect-[4/3] md:aspect-auto md:h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-9xl opacity-50">📖</span>
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-full mb-4">
                Destaque
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredPost.publishedAt).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime} min de leitura
                </span>
              </div>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Ler artigo completo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Other Posts */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
            Mais Artigos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-muted to-accent/30 flex items-center justify-center">
                  <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">
                    📖
                  </span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Ler
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
