import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0D1117] text-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -ml-24 -mb-24" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Artigos Religiosos Premium</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              A Beleza da Fé em <br />
              <span className="text-gradient-gold">Cada Detalhe</span>
            </h1>

            <p className="text-xl text-white/70 max-w-lg leading-relaxed font-light">
              ENTRESANTOS: Juntos no caminho da santidade. Peças exclusivas, 
              confeccionadas com reverência e materiais nobres para elevar 
              sua experiência de oração.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link to="/loja">
                <Button size="lg" className="btn-gold px-10 h-14 gap-2 text-lg shadow-gold !text-black">
                  Explorar Coleção
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contato">
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-white/90 transition-all font-bold">
                  Falar Conosco
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <span className="text-secondary text-lg">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Envio Imediato</p>
                  <p className="text-xs text-white/50">Para todo o país</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <span className="text-secondary text-lg">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Obras de Arte</p>
                  <p className="text-xs text-white/50">Feitas à mão</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image / Logo Showcase */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-[80px] scale-110 animate-pulse" />
              
              {/* Main Visual */}
              <div className="relative h-full w-full rounded-[40px] overflow-hidden border border-white/10 glass-morphism flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                <div className="p-12 text-center group">
                  <div className="w-64 h-64 rounded-full border-4 border-secondary/30 p-2 group-hover:border-secondary transition-colors duration-700">
                    <img 
                      src="/logo-entresantos.jpg" 
                      alt="ENTRESANTOS" 
                      className="w-full h-full object-cover rounded-full shadow-2xl scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-8 space-y-2">
                    <p className="font-serif text-3xl font-bold tracking-widest text-secondary">ENTRESANTOS</p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">Santo Rosário & Fé</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-4 h-4 bg-secondary/40 rounded-full blur-md animate-float" />
                <div className="absolute bottom-20 right-10 w-6 h-6 bg-secondary/20 rounded-full blur-lg animate-float delay-1000" />
              </div>
              
              {/* Reviews Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#1A1F26] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-[#1A1F26] flex items-center justify-center text-xs overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Excelência</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Mais de 500 depoimentos</p>
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
