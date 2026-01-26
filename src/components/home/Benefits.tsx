import { Truck, Award, CreditCard, HeartHandshake } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Materiais nobres selecionados e acabamento artesanal impecável",
  },
  {
    icon: HeartHandshake,
    title: "Artigos Abençoados",
    description: "Todos os terços passam por bênção antes de serem enviados",
  },
  {
    icon: Truck,
    title: "Entrega Segura",
    description: "Enviamos para todo o Brasil com embalagem especial de proteção",
  },
  {
    icon: CreditCard,
    title: "Pagamento Facilitado",
    description: "Parcele em até 12x sem juros ou pague via PIX com desconto",
  },
];

export function Benefits() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                <benefit.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">{benefit.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
