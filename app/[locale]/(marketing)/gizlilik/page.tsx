import { Card } from "@/components/ui/card"

export const metadata = {
    title: "Gizlilik Politikası | Pasiflow",
    description: "Pasiflow gizlilik politikası ve veri güvenliği hakkında bilgiler"
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#F6F7F9] py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-sm border border-[#E5E6E8]">
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
                        Gizlilik Politikası
                    </h1>
                    <p className="text-sm text-[#535454] mb-8 font-medium">Son Güncelleme: Aralık 2025</p>

                    <div className="prose prose-lg max-w-none space-y-8 text-slate-600">

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Giriş</h2>
                            <p>
                                Pasiflow Property Management Group, LLC (“Pasiflow”, “Şirket” veya “Biz”) olarak, gizliliğinizi ve kişisel verilerinizin korunmasını ciddiyetle ele alıyoruz. Bu Gizlilik Politikası; web sitemizi ziyaret ettiğinizde, formlarımızı doldurduğunuzda veya hizmetlerimizden yararlandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve nasıl koruduğumuzu açıklamaktadır.
                            </p>
                            <p className="mt-2">
                                Web sitemizi ve hizmetlerimizi kullanarak bu Gizlilik Politikası’nda belirtilen uygulamaları kabul etmiş sayılırsınız.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">2. Topladığımız Bilgiler</h2>
                            <p className="mb-2">Aşağıdaki türlerde bilgileri toplayabiliriz:</p>

                            <h3 className="font-semibold text-[#1F2328] mt-4 mb-2">a. Kişisel Bilgiler</h3>
                            <p>Tarafınızca doğrudan sağlanan bilgiler:</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Ad ve soyad</li>
                                <li>E-posta adresi</li>
                                <li>Telefon numarası</li>
                                <li>Ülke / şehir bilgisi</li>
                                <li>Yatırım tercihleri ve talep formlarında paylaşılan bilgiler</li>
                            </ul>

                            <h3 className="font-semibold text-[#1F2328] mt-4 mb-2">b. Kullanım ve Teknik Veriler</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>IP adresi</li>
                                <li>Tarayıcı türü ve versiyonu</li>
                                <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                                <li>Cihaz bilgileri</li>
                            </ul>

                            <h3 className="font-semibold text-[#1F2328] mt-4 mb-2">c. Çerezler (Cookies)</h3>
                            <p>Web sitemizin düzgün çalışmasını ve kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">3. Bilgilerin Kullanım Amaçları</h2>
                            <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılabilir:</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                                <li>Taleplerinize yanıt vermek ve sizinle iletişime geçmek</li>
                                <li>Yatırım bilgilendirmeleri ve operasyonel süreçler hakkında bilgi paylaşmak</li>
                                <li>Web sitesi performansını ve kullanıcı davranışlarını analiz etmek</li>
                                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                                <li>Dolandırıcılığı ve yetkisiz erişimi önlemek</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">4. Çerez Politikası</h2>
                            <p>
                                Web sitemizde, kullanıcı deneyimini geliştirmek ve analiz yapmak amacıyla çerezler kullanılmaktadır. Tarayıcı ayarlarınızı değiştirerek çerezleri devre dışı bırakabilirsiniz; ancak bu durumda web sitemizin bazı bölümleri düzgün çalışmayabilir.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">5. Üçüncü Taraf Hizmetleri</h2>
                            <p>Web sitemizde aşağıdaki üçüncü taraf hizmet sağlayıcılar kullanılabilir:</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Google Analytics ve benzeri analiz araçları</li>
                            </ul>
                            <p className="mt-2 text-sm italic">
                                Bu hizmet sağlayıcılar, kendi gizlilik politikalarına tabidir. Pasiflow, bu üçüncü tarafların veri işleme uygulamalarından sorumlu değildir.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">6. Veri Güvenliği</h2>
                            <p>
                                Kişisel verilerinizi korumak amacıyla, endüstri standartlarına uygun teknik ve idari güvenlik önlemleri uygulamaktayız. Ancak internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olduğu garanti edilemez.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">7. Haklarınız</h2>
                            <p>Geçerli veri koruma mevzuatları kapsamında aşağıdaki haklara sahipsiniz:</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Kişisel verilerinize erişim talep etme</li>
                                <li>Yanlış veya eksik bilgilerin düzeltilmesini isteme</li>
                                <li>Verilerinizin silinmesini veya işlenmesinin sınırlandırılmasını talep etme</li>
                            </ul>
                            <p className="mt-2">Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1F2328] mb-3">8. İletişim</h2>
                            <p>
                                Bu Gizlilik Politikası veya kişisel verilerinizle ilgili sorularınız için bizimle aşağıdaki adresten iletişime geçebilirsiniz:
                            </p>
                            <p className="mt-4 font-semibold text-primary">
                                📧 info@pasiflow.com
                            </p>
                        </section>

                    </div>
                </Card>
            </div>
        </div>
    )
}
