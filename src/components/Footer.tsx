import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark-gray pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-serif italic">
            LUMINA <span className="text-brand-pink font-sans font-bold not-italic">NOIR</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Redefinindo a sensualidade com elegância e ousadia. Lingerie premium feita para quem não tem medo de brilhar.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-pink transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-pink transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-pink transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-6">Explore</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/shop" className="hover:text-brand-pink transition-colors">Ver Loja</Link></li>
            <li><Link to="/shop?filter=conjuntos" className="hover:text-brand-pink transition-colors">Conjuntos</Link></li>
            <li><Link to="/shop?filter=novidades" className="hover:text-brand-pink transition-colors">Novidades</Link></li>
            <li><Link to="/shop?filter=sale" className="hover:text-brand-pink transition-colors">Promoções</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-6">Ajuda</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-brand-pink transition-colors">Guia de Tamanhos</a></li>
            <li><a href="#" className="hover:text-brand-pink transition-colors">Trocas e Devoluções</a></li>
            <li><a href="#" className="hover:text-brand-pink transition-colors">Envio e Entrega</a></li>
            <li><a href="#" className="hover:text-brand-pink transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm mb-6">Contato</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-pink shrink-0" />
              <span>Av. da Moda, 1000 - São Paulo, SP</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-pink shrink-0" />
              <span>(11) 99999-0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-pink shrink-0" />
              <span>contato@luminanoir.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 LUMINA NOIR. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};
