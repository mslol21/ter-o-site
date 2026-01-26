import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-serif text-xl">✝</span>
              </div>
              <span className="font-serif text-xl font-semibold">Terços de Fé</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Levando fé e devoção através de terços artesanais de alta qualidade. 
              Cada terço é feito com amor e abençoado para sua jornada espiritual.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-secondary hover:text-secondary-foreground flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/loja" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Loja de Terços
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Blog Religioso
                </Link>
              </li>
              <li>
                <Link to="/liturgia" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Liturgia Diária
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-secondary/80 hover:text-secondary transition-colors text-sm font-medium">
                  Painel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Informações</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/politica-privacidade" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/politica-troca" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/politica-envio" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Política de Envio
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  São Paulo, SP - Brasil
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+5511999999999" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:contato@tercosfe.com.br" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  contato@tercosfe.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © 2024 Terços de Fé. Todos os direitos reservados.
          </p>
          <p className="text-background/50 text-sm">
            Feito com ❤️ e muita fé
          </p>
        </div>
      </div>
    </footer>
  );
}
