import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl font-bold">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Que tal escolher um lindo terço para fortalecer sua fé? 
            Temos opções artesanais feitas com muito amor.
          </p>
          <Link to="/loja">
            <Button className="btn-gold mt-4">Ver Todos os Terços</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <BreadcrumbNav items={[{ label: "Carrinho" }]} />

        <h1 className="font-serif text-3xl font-bold mt-8 mb-12">Meu Carrinho</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-border rounded-xl bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center text-3xl shrink-0">
                  📿
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg font-bold">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {item.devotion.replace("-", " ")}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center border border-border rounded-lg scale-90 -ml-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-sacred p-8 rounded-2xl sticky top-24 space-y-6">
              <h2 className="font-serif text-xl font-bold">Resumo do Pedido</h2>
              
              <div className="space-y-3 text-sm border-b border-border pb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Itens ({totalItems})</span>
                  <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <Link to="/checkout" className="block pt-4">
                <Button className="w-full btn-gold h-12 gap-2 text-lg">
                  Finalizar Compra
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              
              <p className="text-xs text-center text-muted-foreground">
                Pagamento via PIX com 5% de desconto (calculado no próximo passo)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
