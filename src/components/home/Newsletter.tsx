import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, BookOpen, Gift } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Inscrição realizada!", {
        description: "Você receberá nosso conteúdo em breve.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-sacred">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-elevated relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Receba Orações e Reflexões
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Inscreva-se e receba em seu email orações diárias, 
                reflexões espirituais e ofertas exclusivas.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  Conteúdo semanal
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Gift className="w-4 h-4 text-secondary" />
                  Ofertas especiais
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-background border-border"
                />
                <Button type="submit" className="w-full h-12 btn-gold gap-2">
                  <Send className="w-4 h-4" />
                  Quero Receber
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Respeitamos sua privacidade. Cancele quando quiser.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
