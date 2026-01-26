import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Nossa Coleção
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Terços em Destaque
          </h2>
          <p className="text-muted-foreground mt-4">
            Selecionamos os terços mais amados pela nossa comunidade de fiéis. 
            Cada peça carrega história, fé e devoção.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className={`animate-fade-in-up delay-${(index + 1) * 100}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/loja">
            <Button variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
              Ver Todos os Terços
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
