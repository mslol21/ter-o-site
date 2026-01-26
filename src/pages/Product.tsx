import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { getProductBySlug, products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ShoppingBag, Heart, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/loja">
            <Button>Voltar para a Loja</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const relatedProducts = products
    .filter((p) => p.devotion === product.devotion && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <Layout>
      <div className="container py-8">
        <BreadcrumbNav
          items={[
            { label: "Loja", href: "/loja" },
            { label: product.name },
          ]}
        />

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-muted to-accent/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <span className="text-9xl">📿</span>
              {product.bestseller && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">
                  Mais Vendido
                </span>
              )}
            </div>
            {/* Thumbnail strip - placeholder */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center hover:ring-2 ring-primary transition-all"
                >
                  <span className="text-2xl opacity-60">📿</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-secondary font-medium uppercase tracking-wider mb-2">
                {product.devotion.replace("-", " ")}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  R$ {product.originalPrice!.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Materials & Size */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-foreground">Materiais: </span>
                <span className="text-muted-foreground">
                  {product.materials.join(", ")}
                </span>
              </div>
              <div>
                <span className="font-medium text-foreground">Tamanho: </span>
                <span className="text-muted-foreground">{product.size}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Disponibilidade: </span>
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `${product.stock} em estoque` : "Esgotado"}
                </span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 btn-gold gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5" />
                Adicionar ao Carrinho
              </Button>

              <Button variant="outline" size="lg" className="border-border">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Frete Grátis*</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Compra Segura</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">7 Dias Troca</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Description */}
        <section className="mt-16 bg-sacred rounded-3xl p-8 md:p-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Significado Espiritual
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {product.spiritualDescription}
          </p>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              Terços Relacionados
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Product;
