import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { products, devotions } from "@/data/products";
import { Filter, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { id: "popular", label: "Mais Populares" },
  { id: "price-asc", label: "Menor Preço" },
  { id: "price-desc", label: "Maior Preço" },
  { id: "newest", label: "Mais Recentes" },
];

const Shop = () => {
  const [selectedDevotion, setSelectedDevotion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = selectedDevotion
    ? products.filter((p) => p.devotion === selectedDevotion)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return 0; // Would sort by date if available
      default:
        return b.bestseller ? 1 : -1;
    }
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-sacred py-12">
        <div className="container">
          <BreadcrumbNav items={[{ label: "Loja" }]} />
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Loja de Terços
            </h1>
            <p className="text-muted-foreground mt-3">
              Encontre o terço perfeito para sua jornada de fé. Todos os nossos 
              terços são artesanais e abençoados.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Devotions Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Devoções
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedDevotion(null)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        !selectedDevotion
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      Todos os Terços
                    </button>
                    {devotions.map((devotion) => (
                      <button
                        key={devotion.id}
                        onClick={() => setSelectedDevotion(devotion.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                          selectedDevotion === devotion.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <span>{devotion.name}</span>
                        <span className="text-xs opacity-70">({devotion.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range - Visual only */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">
                    Faixa de Preço
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>R$ 59,90</span>
                      <span>R$ 99,90</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-full w-full bg-gradient-to-r from-secondary to-secondary/50 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Toggle + Sort */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                </Button>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    Ordenar:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded-lg px-3 py-2 bg-background"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 p-4 bg-muted/50 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-3">Devoções</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedDevotion(null)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-colors",
                        !selectedDevotion
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground border border-border"
                      )}
                    >
                      Todos
                    </button>
                    {devotions.map((devotion) => (
                      <button
                        key={devotion.id}
                        onClick={() => setSelectedDevotion(devotion.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-colors",
                          selectedDevotion === devotion.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground border border-border"
                        )}
                      >
                        {devotion.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                {sortedProducts.length} terço{sortedProducts.length !== 1 ? "s" : ""} encontrado{sortedProducts.length !== 1 ? "s" : ""}
              </p>

              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum terço encontrado para esta categoria.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSelectedDevotion(null)}
                    className="mt-2"
                  >
                    Ver todos os terços
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
