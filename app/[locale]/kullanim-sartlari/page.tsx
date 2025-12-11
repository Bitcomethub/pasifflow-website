import { Card } from "@/components/ui/card"

export const metadata = {
    title: "Kullanım Şartları | Pasiflow",
    description: "Pasiflow hizmet kullanım şartları ve koşulları"
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-4xl mx-auto p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                        Kullanım Şartları
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">Son Güncelleme: Aralık 2024</p>

                    <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                        <h2 className="text-xl font-semibold text-foreground">1. Kabul</h2>
                        <p>
                            Bu web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">2. Hizmet Tanımı</h2>
                        <p>
                            Pasiflow, Amerika Birleşik Devletleri'nde gayrimenkul yatırımı danışmanlığı hizmeti sunmaktadır. Sunulan bilgiler yatırım tavsiyesi niteliği taşımamakta olup, bilgilendirme amaçlıdır.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">3. Yatırım Riskleri</h2>
                        <p>
                            Gayrimenkul yatırımları risk içermektedir. Geçmiş performans, gelecek sonuçları garanti etmez. Yatırım kararı vermeden önce bağımsız finansal danışmanlık almanızı öneririz.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">4. Fikri Mülkiyet</h2>
                        <p>
                            Bu web sitesindeki tüm içerik, tasarım, logo ve materyaller Pasiflow'a aittir ve telif hakkı ile korunmaktadır. İzinsiz kullanım yasaktır.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">5. Sorumluluk Sınırlaması</h2>
                        <p>
                            Pasiflow, web sitesindeki bilgilerin doğruluğu konusunda herhangi bir garanti vermemektedir. Site kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu değildir.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">6. Dış Bağlantılar</h2>
                        <p>
                            Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriğinden veya gizlilik uygulamalarından sorumlu değiliz.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">7. Değişiklikler</h2>
                        <p>
                            Bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutarız. Değişiklikler web sitesinde yayınlandığı anda yürürlüğe girer.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">8. Uygulanacak Hukuk</h2>
                        <p>
                            Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklarda İstanbul Mahkemeleri yetkilidir.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">9. İletişim</h2>
                        <p>
                            Kullanım şartları hakkında sorularınız için <strong>info@pasiflow.com</strong> adresine e-posta gönderebilirsiniz.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
