import { Card } from "@/components/ui/card"

export const metadata = {
    title: "Gizlilik Politikası | Pasiflow",
    description: "Pasiflow gizlilik politikası ve çerez kullanımı hakkında bilgiler"
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-4xl mx-auto p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                        Gizlilik Politikası
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">Son Güncelleme: Aralık 2024</p>

                    <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                        <h2 className="text-xl font-semibold text-foreground">Giriş</h2>
                        <p>
                            Pasiflow olarak, gizliliğinizi korumayı taahhüt ediyoruz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">Topladığımız Bilgiler</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Kişisel Bilgiler:</strong> Ad, e-posta, telefon numarası gibi doğrudan sağladığınız bilgiler</li>
                            <li><strong>Kullanım Verileri:</strong> IP adresi, tarayıcı türü, ziyaret edilen sayfalar</li>
                            <li><strong>Çerezler:</strong> Web sitesi deneyiminizi geliştirmek için kullanılan küçük veri dosyaları</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-foreground">Bilgilerin Kullanımı</h2>
                        <p>Topladığımız bilgileri şu amaçlarla kullanıyoruz:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                            <li>Sizinle iletişim kurmak</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                            <li>Web sitemizin performansını analiz etmek</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-foreground">Çerez Politikası</h2>
                        <p>
                            Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz, ancak bu bazı özelliklerin çalışmamasına neden olabilir.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">Üçüncü Taraf Hizmetleri</h2>
                        <p>
                            Google Analytics ve benzeri analitik araçları kullanmaktayız. Bu hizmetlerin kendi gizlilik politikaları bulunmaktadır.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">Veri Güvenliği</h2>
                        <p>
                            Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri uygulamaktayız. Ancak, internet üzerinden iletilen hiçbir verinin %100 güvenli olmadığını hatırlatmak isteriz.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">Haklarınız</h2>
                        <p>
                            Kişisel verilerinizle ilgili erişim, düzeltme veya silme talep etme hakkına sahipsiniz. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">İletişim</h2>
                        <p>
                            Gizlilik politikamız hakkında sorularınız için <strong>info@pasiflow.com</strong> adresine e-posta gönderebilirsiniz.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
