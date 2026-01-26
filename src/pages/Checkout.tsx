import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    zip: "",
    address: "",
    city: "",
    state: "",
  });

  if (items.length === 0) {
    navigate("/loja");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular processamento do pedido
    setTimeout(() => {
      setLoading(false);
      toast.success("Pedido realizado com sucesso!");
      clearCart();
      navigate("/pedido-concluido");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-8">
        <BreadcrumbNav
          items={[
            { label: "Carrinho", href: "/carrinho" },
            { label: "Finalizar Compra" },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          {/* Form */}
          <div className="space-y-8">
            <h1 className="font-serif text-3xl font-bold">Informações de Entrega</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-sm font-medium">Nome Completo</label>
                  <Input 
                    name="name" 
                    required 
                    placeholder="Como no seu RG" 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="seuemail@exemplo.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">WhatsApp</label>
                  <Input 
                    name="phone" 
                    required 
                    placeholder="(00) 00000-0000" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CEP</label>
                  <Input 
                    name="zip" 
                    required 
                    placeholder="00000-000" 
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cidade</label>
                  <Input 
                    name="city" 
                    required 
                    placeholder="Sua cidade" 
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-sm font-medium">Endereço Completo</label>
                  <Input 
                    name="address" 
                    required 
                    placeholder="Rua, número e complemento" 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="p-6 bg-muted/50 rounded-xl border border-dashed border-border space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Forma de Pagamento
                </h3>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-background border-2 border-primary rounded-lg">
                    <p className="font-bold">PIX (Pendente)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Finalize para receber o código e pagar via app do seu banco.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-gold h-14 text-lg shadow-lg"
                disabled={loading}
              >
                {loading ? "Processando..." : "Finalizar Pedido Agora"}
              </Button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-sacred p-8 rounded-2xl space-y-6">
              <h2 className="font-serif text-xl font-bold border-b border-border pb-4">
                Seu Pedido
              </h2>
              
              <div className="space-y-4 max-h-60 overflow-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary text-2xl">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Parcelamento disponível apenas via cartão (indisponível no momento). 
                  Aproveite o frete grátis em toda a loja.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4 p-6 border border-border rounded-2xl">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Compra 100% Segura</h4>
                  <p className="text-xs text-muted-foreground font-sans">
                    Seus dados estão protegidos por criptografia de ponta a ponta.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Truck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Entrega Garantida</h4>
                  <p className="text-xs text-muted-foreground font-sans">
                    Receba seus terços em casa com seguro e rastreamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
