import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, BookOpen, Quote, Shield, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LiturgicalAgenda = () => {
  // Dados baseados na data atual (26/01/2026)
  const today = {
    date: "26/01/2026",
    weekday: "Segunda-feira",
    tempo: "Tempo Comum (3ª Semana)",
    cor: "Branco",
    celebracao: "Memória de Santos Timóteo e Tito, bispos",
    santos: "Santos Timóteo e Tito: Discípulos e colaboradores próximos do Apóstolo São Paulo. Timóteo foi o primeiro bispo de Éfeso e Tito o primeiro bispo de Creta.",
    leituras: {
      primeira: "2Tm 1, 1-8 (ou Tt 1, 1-5)",
      salmo: "Sl 95(96), 1-2a. 2b-3. 7-8a. 10",
      evangelho: "Lc 10, 1-9",
      salmoResposta: "Proclamai às nações a glória do Senhor!"
    },
    comentario: "A Igreja celebra hoje a memória de dois grandes pastores que foram pilares na expansão do cristianismo apostólico. Timóteo e Tito representam a continuidade da missão iniciada pelos apóstolos, recebendo a incumbência de zelar pela sã doutrina e pela caridade nas comunidades. O Evangelho nos recorda que a messe é grande, mas os operários são poucos, instando-nos a uma entrega generosa ao serviço do Reino. Como colaboradores de Paulo, esses santos nos ensinam que a evangelização é um trabalho de comunhão e fraternidade, onde cada um coloca seus dons a serviço do Evangelho. Somos exortados a não ter um espírito de timidez, mas de fortaleza, amor e sobriedade no anúncio de Cristo.",
    sugestao: "Dedique um momento de sua oração pessoal ou uma dezena do Terço para pedir ao Senhor que fortaleça o Papa, os Bispos e os Padres, para que sejam servos fiéis e zelosos como foram Timóteo e Tito. Se possível, realize uma obra de caridade em favor da sua paróquia local."
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <BreadcrumbNav items={[{ label: "Agenda Litúrgica" }]} />

        <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header da Agenda */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="px-4 py-1 text-primary border-primary/30 uppercase tracking-widest bg-primary/5">
              Liturgia Diária
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              {today.date}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {today.weekday}
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-full bg-white border border-slate-200 shadow-sm`} />
                Cor: {today.cor}
              </span>
            </div>
            <p className="text-xl font-serif italic text-primary max-w-2xl mx-auto">
              "{today.celebracao}"
            </p>
          </div>

          <div className="grid gap-6">
            {/* Informações Gerais */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-soft bg-sacred">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-sans flex items-center gap-2 text-primary uppercase tracking-tight">
                    <Shield className="w-4 h-4" />
                    Tempo Litúrgico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-lg font-semibold">{today.tempo}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft bg-sacred">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-sans flex items-center gap-2 text-primary uppercase tracking-tight">
                    <Heart className="w-4 h-4" />
                    Santos do Dia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{today.santos}</p>
                </CardContent>
              </Card>
            </div>

            {/* Leituras */}
            <Card className="border-none shadow-elevated overflow-hidden">
              <div className="bg-primary/5 border-b border-primary/10 px-6 py-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-xl font-bold">Leituras da Missa</h3>
              </div>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                    <span className="font-sans text-xs font-bold uppercase text-slate-400">Primeira Leitura</span>
                    <span className="font-serif text-lg">{today.leituras.primeira}</span>
                  </div>
                  <div className="p-6 flex flex-col gap-2 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <span className="font-sans text-xs font-bold uppercase text-slate-400">Salmo Responsorial</span>
                      <span className="font-serif text-lg">{today.leituras.salmo}</span>
                    </div>
                    <p className="text-primary font-medium text-sm italic">R. {today.leituras.salmoResposta}</p>
                  </div>
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                    <span className="font-sans text-xs font-bold uppercase text-slate-400">Evangelho</span>
                    <span className="font-serif text-lg font-bold text-primary">{today.leituras.evangelho}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comentário */}
            <Card className="border-none shadow-soft bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-2xl">
                  <Quote className="w-6 h-6 text-primary opacity-50 rotate-180" />
                  Reflexão Pastoral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg italic font-serif">
                  {today.comentario}
                </p>
              </CardContent>
            </Card>

            {/* Sugestão Espiritual */}
            <div className="bg-gradient-gold p-8 rounded-2xl text-foreground text-center space-y-4 shadow-gold">
              <h3 className="font-serif text-2xl font-bold">Sugestão Espiritual do Dia</h3>
              <p className="max-w-2xl mx-auto font-medium leading-relaxed">
                {today.sugestao}
              </p>
              <div className="pt-2">
                <Badge className="bg-foreground text-background hover:bg-foreground/90 py-1 px-4">
                  Vivência da Fé
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiturgicalAgenda;
