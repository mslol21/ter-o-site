import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Heart, Users, Award, BookOpen } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Fé Autêntica",
    description: "Cada terço é feito com amor e devoção, respeitando as tradições católicas milenares.",
  },
  {
    icon: Award,
    title: "Qualidade Artesanal",
    description: "Materiais nobres e acabamento impecável garantem durabilidade e beleza.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Fazemos parte de uma grande família de fiéis unidos pela oração do Rosário.",
  },
  {
    icon: BookOpen,
    title: "Evangelização",
    description: "Compartilhamos a fé através de conteúdo religioso e artigos de qualidade.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-sacred py-12">
        <div className="container">
          <BreadcrumbNav items={[{ label: "Sobre" }]} />
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Sobre Nós
            </h1>
            <p className="text-muted-foreground mt-3">
              Conheça a história e os valores que guiam a Terços de Fé.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gradient-to-br from-muted to-accent/30 rounded-3xl flex items-center justify-center">
              <span className="text-9xl opacity-50">🙏</span>
            </div>
            <div className="space-y-6">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Nossa História
              </span>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Nascemos da Fé, Crescemos com Devoção
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Terços de Fé nasceu do desejo de levar terços de qualidade para 
                  todos os católicos que buscam fortalecer sua vida de oração. Somos 
                  uma empresa familiar, fundada por pessoas que vivem a fé no dia a dia.
                </p>
                <p>
                  Cada terço que produzimos passa por mãos dedicadas e recebe nossa 
                  bênção antes de chegar até você. Acreditamos que um terço é mais do 
                  que um objeto — é um instrumento de fé, um companheiro de oração.
                </p>
                <p>
                  Nossa missão é ajudar milhares de pessoas a desenvolverem uma vida 
                  de oração mais profunda através do Santo Rosário, oferecendo terços 
                  artesanais de qualidade e conteúdo espiritual edificante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Nossos Valores
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">
              O que nos Move
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-8 text-center shadow-card"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Nossa Missão
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-6">
              Evangelizar através da Beleza
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Acreditamos que a beleza é um caminho para Deus. Por isso, criamos 
              terços que não são apenas funcionais, mas verdadeiras obras de arte 
              sacra. Queremos que cada pessoa que segure um de nossos terços sinta 
              o chamado à oração e à contemplação dos mistérios de Cristo.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="font-serif text-4xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground text-sm mt-1">Avaliações 5 estrelas</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-primary">10k+</p>
                <p className="text-muted-foreground text-sm mt-1">Terços enviados</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold text-primary">27</p>
                <p className="text-muted-foreground text-sm mt-1">Estados atendidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
