import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">Pasif<span className="text-accent">flow</span></span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Amerika'da devlet garantili (Section 8) kira gelirli gayrimenkul yatırımı ile dolar bazında pasif gelir elde etmenin en güvenli yolu.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Hızlı Erişim</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="#nasil-calisir" className="hover:text-accent transition-colors">Nasıl Çalışır?</Link></li>
              <li><Link href="#portfoy" className="hover:text-accent transition-colors">Portföy</Link></li>
              <li><Link href="#faq" className="hover:text-accent transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="hover:text-accent transition-colors">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Yasal</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/gizlilik" className="hover:text-accent transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-sartlari" className="hover:text-accent transition-colors">Kullanım Şartları</Link></li>
              <li><Link href="/aydinlatma-metni" className="hover:text-accent transition-colors">KVKK Aydınlatma Metni</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">İletişim</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p>Miami, FL</p>
              <p>info@pasifflow.com</p>
              <p>+1 (305) 555-0123</p>
              <p className="pt-4 text-xs text-white/40">
                *Bu sitede yer alan bilgiler yatırım tavsiyesi değildir.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Pasifflow LLC. Tüm hakları saklıdır.</p>
          <p className="text-xs">
            Designed with <span className="text-accent">♥</span> for Global Investors
          </p>
        </div>
      </div>
    </footer>
  )
}
