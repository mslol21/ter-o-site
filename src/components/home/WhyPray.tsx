import { Heart, Shield, Users, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Paz Interior",
    description: "A oração do terço acalma o coração e traz serenidade para o dia a dia.",
  },
  {
    icon: Shield,
    title: "Proteção Espiritual",
    description: "Nossa Senhora prometeu proteção especial a quem reza o Rosário devotamente.",
  },
  {
    icon: Users,
    title: "União Familiar",
    description: "Família que reza unida permanece unida. O terço fortalece os laços.",
  },
  {
    icon: Sparkles,
    title: "Graças Especiais",
    description: "Inúmeros milagres e conversões são atribuídos à oração do Santo Terço.",
  },
];

export function WhyPray() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Espiritualidade
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Por que Rezar o Terço?
          </h2>
          <p className="text-muted-foreground mt-4">
            O Santo Terço é uma das orações mais poderosas da Igreja Católica. 
            Descubra os frutos desta devoção milenar.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="relative">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-secondary/30 font-serif">
              "
            </span>
            <p className="font-serif text-xl sm:text-2xl text-foreground italic leading-relaxed">
              O Rosário é a minha oração predileta. Oração maravilhosa na sua 
              simplicidade e profundidade.
            </p>
            <footer className="mt-6">
              <cite className="not-italic">
                <span className="font-semibold text-foreground">Papa João Paulo II</span>
                <span className="text-muted-foreground block text-sm mt-1">
                  Santo Padre (1978-2005)
                </span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
