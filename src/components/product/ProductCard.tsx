import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <article className={cn("card-product group", className)}>
      {/* ... image and badges ... */}
      <Link to={`/produto/${product.slug}`} className="block relative aspect-square">
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent/30 flex items-center justify-center">
          <span className="text-7xl opacity-60 group-hover:scale-110 transition-transform duration-300">
            📿
          </span>
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestseller && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
              Mais Vendido
            </span>
          )}
          {hasDiscount && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              -{discountPercent}%
            </span>
          )}
        </div>

        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
          <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </Link>

      <div className="p-5 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.devotion.replace("-", " ")}
          </p>
          <Link to={`/produto/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice!.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 btn-gold gap-2" 
            size="sm"
            onClick={() => addItem(product, 1)}
          >
            <ShoppingBag className="w-4 h-4" />
            Comprar
          </Button>
          <Link to={`/produto/${product.slug}`}>
            <Button variant="outline" size="sm" className="border-border hover:bg-muted">
              Ver
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
