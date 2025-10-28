import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href={'#top'} className="flex items-center gap-2">
              <Image
                src="/futbolin-logo.svg"
                width={32}
                height={32}
                alt="Logo Futbol-in"
                />
              <span className="text-2xl font-bold">Futbol-in</span>
                </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma definitiva para encontrar y compartir futbolines en
              tu ciudad.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Producto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#caracteristicas" className="hover:text-accent transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-accent transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#ranking" className="hover:text-accent transition-colors">
                  Ranking
                </a>
              </li>
              <li>
                <a href="#descargar" className="hover:text-accent transition-colors">
                  Descargar App
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Prensa
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Licencias
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Futbol-in. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent/10 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent/10 flex items-center justify-center transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent/10 flex items-center justify-center transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
