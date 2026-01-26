import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-sacred">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Artigos Religiosos Abençoados</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Terços Artesanais para sua{" "}
              <span className="text-gradient-gold">Jornada de Fé</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Cada terço é cuidadosamente confeccionado com materiais nobres e 
              abençoado para acompanhar suas orações. Fortaleça sua fé com 
              peças de devoção autênticas.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/loja">
                <Button size="lg" className="btn-gold gap-2 text-base">
                  Ver Terços
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/blog/como-rezar-o-terco-passo-a-passo">
                <Button variant="outline" size="lg" className="text-base border-primary/30 hover:bg-primary/5">
                  Como Rezar o Terço
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">✓</span>
                <span>Envio para todo Brasil</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">✓</span>
                <span>Artigos Abençoados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">✓</span>
                <span>Compra Segura</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/20 rounded-full blur-3xl scale-90" />
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-card to-muted rounded-3xl p-8 shadow-elevated">
                <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-4 p-8">
                    <span className="text-8xl">📿</span>
                    <p className="font-serif text-xl text-muted-foreground">
                      Terços Artesanais
                    </p>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl px-6 py-3 shadow-elevated border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="font-semibold text-foreground">4.9/5</p>
                      <p className="text-xs text-muted-foreground">+500 avaliações</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
