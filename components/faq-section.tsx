import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      q: "Pasifflow tam olarak nedir?",
      a: "Pasifflow, Amerika'da devlet garantili Section 8 kiracıları olan, anahtar teslim yatırım evleri sunan bir platformdur.",
    },
    {
      q: "Neden Section 8? Devlet garantisi nasıl işliyor?",
      a: "Section 8, ABD hükümeti tarafından desteklenen bir sosyal konut programıdır. Kira ödemeleri doğrudan devlet tarafından garanti edilir.",
    },
    {
      q: "Neden Pasifflow diğer turnkey modellerden daha güvenilir?",
      a: "Pasifflow, uzman bir ekip tarafından yönetilir ve tüm evler Section 8 garantili olarak sunulur. %10-12 net getiri hedefimiz vardır.",
    },
    {
      q: "Evleri nasıl seçiyorsunuz?",
      a: "Evler, yüksek getiri potansiyeli, düşük boşluk riski ve Section 8 uygunluğuna göre özenle seçilir.",
    },
    {
      q: "Hangi eyaletlerde çalışıyorsunuz?",
      a: "Ohio, Tennessee, Michigan, Missouri, Alabama, Indiana ve Kansas eyaletlerinde aktif olarak çalışıyoruz.",
    },
    {
      q: "Tadilatlar nasıl yapılıyor?",
      a: "Tüm tadilatlar profesyonel ekibimiz tarafından yapılır ve evler anahtar teslim olarak sunulur.",
    },
    {
      q: "Kiracı nasıl bulunuyor?",
      a: "Evler zaten Section 8 kiracılı olarak satışa sunulur. Kiracı bulma derdi yoktur.",
    },
    {
      q: "Kira gerçekten garanti mi?",
      a: "Evet, Section 8 programı ile kira ödemeleri devlet tarafından garanti edilir.",
    },
    {
      q: "Net CAP RATE nasıl hesaplanıyor?",
      a: "Net CAP RATE, tüm giderler (vergi, sigorta, bakım, %10 yönetim) düşüldükten sonra kalan net gelirin yatırım tutarına oranıdır.",
    },
    {
      q: "Ev yönetimi kimde?",
      a: "Tüm ev yönetimi profesyonel ekibimiz tarafından yapılır. Siz sadece aylık gelir alırsınız.",
    },
    {
      q: "Türkiye'den almak için süreç nasıl?",
      a: "Tüm süreç online olarak yürütülür. Dijital imza ve wire transfer ile işlemler tamamlanır.",
    },
    { q: "Mortgage kullanabilir miyim?", a: "Evet, yabancı yatırımcılar için mortgage seçenekleri mevcuttur." },
    { q: "Değer artışı ne durumda?", a: "5 yıllık ortalama %30-50 değer artışı beklenmektedir." },
    {
      question: "Evleri görmeden nasıl alabilirim?",
      answer: "Tüm evlerimiz için detaylı video turlar, ekspertiz raporları ve üçüncü taraf denetim raporları sunuyoruz. Ayrıca tapu devri ve para transferi Title Company (Tapu Şirketi) güvencesiyle yapılır.",
    },
    {
      question: "Kira garantisi nasıl işliyor?",
      answer: "Evlerimiz 'Section 8' programına dahildir. Bu programda kiranın büyük bir kısmı (%70-100'ü) doğrudan Amerikan hükümeti tarafından her ayın ilk haftası hesabınıza yatırılır.",
    },
    {
      question: "Vergi ve yasal süreçler nasıl yönetiliyor?",
      answer: "Sizin adınıza bir LLC (Limited Şirket) kuruyoruz. Tüm vergi beyanları ve yasal süreçler anlaşmalı olduğumuz CPA (Mali Müşavir) ve hukuk büroları tarafından takip ediliyor.",
    },
    {
      question: "Evde tadilat gerekirse ne oluyor?",
      answer: "Evlerimiz 'Turnkey' (Anahtar Teslim) olarak, yani tamamen yenilenmiş şekilde satılır. Satış sonrası ilk 6-12 ay kapsamlı garanti veriyoruz. Sonrasında ise profesyonel yönetim firmamız bakım süreçlerini yönetir.",
    },
    {
      question: "Yönetim (Property Management) ücreti ne kadar?",
      answer: "Aylık kiranın %10'u oranında bir yönetim ücreti alınır. Bu ücrete kira toplama, kiracı ilişkileri, bakım onarım takibi ve yasal bildirimler dahildir.",
    },
    {
      question: "Yatırımımı ne zaman geri alırım (ROI)?",
      answer: "Ortalama olarak dolar bazında yıllık %10-12 net getiri sunuyoruz. Bu da yaklaşık 8-10 yıl içinde yatırımınızın kendini amorti etmesi anlamına gelir (evin değer artışı hariç).",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Sıkça Sorulan Sorular</h2>
          <p className="text-muted-foreground text-lg">Aklınıza takılan soruların cevapları burada.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-background border border-border/50 rounded-lg px-2 shadow-sm">
              <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline hover:text-primary transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
