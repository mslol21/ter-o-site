import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getRecentPosts } from "@/data/posts";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");
  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);
  const relatedProducts = products.slice(0, 2);

  if (!post) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Artigo não encontrado</h1>
          <Link to="/blog">
            <Button>Voltar para o Blog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-sacred py-12">
        <div className="container">
          <BreadcrumbNav
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
        </div>
      </section>

      {/* Article */}
      <article className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-12 text-center">
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-full mb-6">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-12">
              <span className="text-9xl opacity-50">📖</span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split("\n")
                    .map((line) => {
                      if (line.startsWith("# ")) {
                        return `<h1 class="font-serif text-3xl font-bold mt-12 mb-6">${line.slice(2)}</h1>`;
                      }
                      if (line.startsWith("## ")) {
                        return `<h2 class="font-serif text-2xl font-semibold mt-10 mb-4">${line.slice(3)}</h2>`;
                      }
                      if (line.startsWith("### ")) {
                        return `<h3 class="font-serif text-xl font-semibold mt-8 mb-3">${line.slice(4)}</h3>`;
                      }
                      if (line.startsWith("- ")) {
                        return `<li class="text-muted-foreground ml-4">${line.slice(2)}</li>`;
                      }
                      if (line.trim() === "") return "";
                      return `<p class="text-muted-foreground">${line}</p>`;
                    })
                    .join(""),
                }}
              />
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 bg-sacred rounded-2xl text-center">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                Encontre o Terço Perfeito para Você
              </h3>
              <p className="text-muted-foreground mb-6">
                Conheça nossa coleção de terços artesanais abençoados.
              </p>
              <Link to="/loja">
                <Button className="btn-gold gap-2">
                  Ver Terços
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Blog
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Products */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
            Terços Recomendados
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* More Posts */}
      {recentPosts.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
              Continue Lendo
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {recentPosts.slice(0, 2).map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all flex gap-4"
                >
                  <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <span className="text-3xl opacity-60">📖</span>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.readTime} min de leitura
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
