import { Card } from "@/components/ui/card"

export const metadata = {
    title: "KVKK Aydınlatma Metni | Pasiflow",
    description: "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni"
}

export default function KVKKPage() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-4xl mx-auto p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                        KVKK Aydınlatma Metni
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">Son Güncelleme: Aralık 2024</p>

                    <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                        <h2 className="text-xl font-semibold text-foreground">1. Veri Sorumlusu</h2>
                        <p>
                            Pasiflow ("Şirket"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmektedir.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">2. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
                        <p>
                            Kişisel verileriniz, web sitemiz üzerindeki formlar, e-posta, telefon ve yüz yüze görüşmeler aracılığıyla toplanmaktadır. Bu veriler, sözleşmenin ifası, yasal yükümlülüklerin yerine getirilmesi ve meşru menfaatlerimiz kapsamında işlenmektedir.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">3. İşlenen Kişisel Veriler</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Kimlik bilgileri (ad, soyad)</li>
                            <li>İletişim bilgileri (e-posta, telefon numarası)</li>
                            <li>Finansal bilgiler (yatırım tercihleri, bütçe aralığı)</li>
                            <li>Web sitesi kullanım verileri (çerezler, IP adresi)</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-foreground">4. Kişisel Verilerin İşlenme Amaçları</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Yatırım danışmanlığı hizmetlerinin sunulması</li>
                            <li>İletişim taleplerinin cevaplanması</li>
                            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                            <li>Pazarlama ve tanıtım faaliyetleri (onay alınması halinde)</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-foreground">5. Kişisel Verilerin Aktarımı</h2>
                        <p>
                            Kişisel verileriniz, yasal zorunluluklar çerçevesinde yetkili kamu kurum ve kuruluşlarına, iş ortaklarımıza ve hizmet sağlayıcılarımıza aktarılabilir. Yurtdışına veri aktarımı yapılması halinde, KVKK'nın 9. maddesi uyarınca gerekli önlemler alınmaktadır.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground">6. Haklarınız</h2>
                        <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                            <li>Yurtiçinde veya yurtdışında aktarıldığı üçüncü kişileri bilme</li>
                            <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
                            <li>KVKK'nın 7. maddesindeki şartlar çerçevesinde silinmesini isteme</li>
                            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                            <li>Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-foreground">7. İletişim</h2>
                        <p>
                            KVKK kapsamındaki talepleriniz için <strong>info@pasiflow.com</strong> adresine e-posta gönderebilir veya iletişim formumuzu kullanabilirsiniz.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
