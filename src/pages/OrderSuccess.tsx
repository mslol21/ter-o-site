import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ExternalLink, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const OrderSuccess = () => {
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136faithbeads-pix-exemplo-123456789012345678905204000053039865802BR5913FAITH BEADS6009SAO PAULO62070503***6304ABCD";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    toast.success("Código PIX copiado!");
  };

  return (
    <Layout>
      <div className="container py-20 max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-bold text-foreground">
            Pedido Confirmado!
          </h1>
          <p className="text-muted-foreground">
            Sua fé agora está a caminho de casa. O seu pedido foi registrado com sucesso.
          </p>
        </div>

        {/* Payment Pending Status */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-center gap-2 text-orange-700 font-bold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            Aguardando Pagamento
          </div>

          <p className="text-sm text-orange-600 font-sans">
            Para agilizar o envio, realize o pagamento via <strong>PIX</strong> agora. 
            O seu pedido será processado assim que o pagamento for confirmado.
          </p>

          <div className="bg-white p-6 rounded-xl border border-orange-200 space-y-4">
            <div className="flex justify-center flex-col items-center gap-4">
              <div className="w-40 h-40 bg-muted flex items-center justify-center rounded-lg border border-border">
                <QrCode className="w-32 h-32 opacity-20" />
                <span className="absolute text-xs font-bold text-muted-foreground">QR CODE EXEMPLO</span>
              </div>
              
              <div className="w-full space-y-2">
                <p className="text-xs text-left font-medium text-muted-foreground uppercase tracking-widest">
                  Código Pix Copia e Cola
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted p-3 rounded-lg text-[10px] font-mono break-all text-left border border-border">
                    {pixCode}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="shrink-0 h-auto"
                    onClick={handleCopyPix}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/loja">
              <Button variant="outline" className="w-full sm:w-auto">
                Voltar para a Loja
              </Button>
            </Link>
            <Button 
              className="btn-gold w-full sm:w-auto gap-2"
              onClick={() => {
                const message = encodeURIComponent("Olá! Acabei de realizar um pedido na Faith Beads e gostaria de notificar o pagamento via PIX.");
                window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Notificar via WhatsApp
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-sans">
            Você receberá um e-mail com os detalhes do pedido e o rastreamento assim 
            que o terço for postado nos Correios.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
