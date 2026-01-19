import { useTranslations } from "next-intl"

export default function KVKKPage() {
    return (
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">KVKK Aydınlatma Metni</h1>

            <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Pasiflow</h2>
                    <p className="font-medium">Son Güncelleme: Aralık 2024</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">1. Veri Sorumlusu</h2>
                    <p>
                        6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla Pasiflow (“Şirket”) tarafından işlenmektedir.
                    </p>
                    <p className="mt-2">
                        <strong>İletişim:</strong> info@pasiflow.com<br />
                        <strong>Adres:</strong> 11850 Biscayne Blvd #179, Miami, FL 33181, ABD
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">2. Kapsam ve Tanımlar</h2>
                    <p>
                        Bu Aydınlatma Metni; web sitemizi ziyaret edenler, iletişim formu dolduranlar, telefon/e-posta yoluyla bize ulaşanlar, görüşme yapanlar, yatırım süreci hakkında bilgi alanlar ve Pasiflow hizmetlerini kullanan ilgili kişiler için geçerlidir.
                    </p>
                    <p className="mt-2">
                        “Kişisel veri”, kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgiyi ifade eder.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">3. Kişisel Verilerin Toplanma Yöntemleri</h2>
                    <p>Kişisel verileriniz aşağıdaki kanallar üzerinden, otomatik veya kısmen otomatik yöntemlerle ya da veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yöntemlerle toplanabilir:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Web sitesi üzerindeki formlar, üyelik/başvuru ekranları, chat ve iletişim alanları</li>
                        <li>E-posta, telefon, WhatsApp ve benzeri iletişim kanalları</li>
                        <li>Görüşmeler (online/telefon/yüz yüze) ve bu görüşmelere ilişkin notlar</li>
                        <li>Çerezler (cookies), piksel etiketleri ve benzeri teknolojiler</li>
                        <li>İş ortakları ve hizmet sağlayıcıları üzerinden iletilen kayıtlar (ör. randevu sistemi, CRM, e-posta gönderim aracı vb.)</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">4. İşlenen Kişisel Veri Kategorileri</h2>
                    <p>Hizmetlerin niteliğine göre aşağıdaki veri kategorileri işlenebilir:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                        <li><strong>İletişim Bilgileri:</strong> E-posta, telefon numarası, ülke/şehir bilgisi</li>
                        <li><strong>Yatırım/Profil Bilgileri:</strong> Yatırım tercihleri, bütçe aralığı, hedef şehir/market, yatırım zamanı, risk tercihi, benzer profil soruları</li>
                        <li><strong>İşlem Güvenliği Verileri:</strong> IP adresi, log kayıtları, cihaz/oturum bilgileri</li>
                        <li><strong>Web Sitesi Kullanım Verileri:</strong> Çerez kayıtları, ziyaret edilen sayfalar, tıklama/etkileşim verileri</li>
                        <li><strong>Talep/Şikayet ve İletişim Kayıtları:</strong> Mesaj içerikleri, görüşme notları, destek talepleri</li>
                        <li><strong>Pazarlama Verileri (onay varsa):</strong> Kampanya/iletişim izinleri, tercih ve etkileşim verileri</li>
                    </ul>
                    <p className="mt-2 text-sm italic">
                        Not: Pasiflow’un süreçlerinde özel nitelikli kişisel veri (sağlık, biyometri vb.) işlenmesi öngörülmez. Bu tür verileri paylaşmamanızı rica ederiz.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">5. Kişisel Verilerin İşlenme Amaçları</h2>
                    <p>Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Bilgilendirme ve yatırım süreçlerine ilişkin talep yönetimi (iletişim taleplerini yanıtlamak)</li>
                        <li>Pasiflow hizmetlerinin sunulması, geliştirilmesi ve süreçlerin yürütülmesi</li>
                        <li>Kullanıcı deneyimi, operasyon ve kalite süreçlerinin yönetilmesi</li>
                        <li>Dolandırıcılık/istismar önleme, bilgi güvenliği ve sistem güvenliğinin sağlanması</li>
                        <li>Hukuki uyuşmazlıkların yönetimi, hak ve menfaatlerin korunması</li>
                        <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi</li>
                        <li>Pazarlama, tanıtım ve kampanya iletişimi (açık rıza alınması halinde)</li>
                        <li>İstatistiksel analiz ve raporlama (mümkün olduğu ölçüde anonimleştirilmiş şekilde)</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">6. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri</h2>
                    <p>Kişisel verileriniz KVKK’nın 5. ve 6. maddelerinde belirtilen şartlara dayanarak işlenir. Başlıca hukuki sebepler:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (KVKK m.5/2-c)</li>
                        <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi (KVKK m.5/2-ç)</li>
                        <li>Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması (KVKK m.5/2-e)</li>
                        <li>Meşru menfaat (KVKK m.5/2-f) (temel hak ve özgürlüklerinize zarar vermemek kaydıyla)</li>
                        <li>Açık rıza (KVKK m.5/1) (özellikle pazarlama iletileri ve/veya yurtdışı aktarımın gerekli olduğu bazı senaryolarda)</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">7. Kişisel Verilerin Aktarılması</h2>
                    <p>Kişisel verileriniz; yukarıdaki amaçlarla sınırlı olarak ve gerekli güvenlik önlemleri alınarak aşağıdaki alıcı gruplarına aktarılabilir:</p>

                    <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">7.1 Yurtiçinde Aktarım</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Yetkili kamu kurum ve kuruluşları (yasal zorunluluklar kapsamında)</li>
                        <li>Hukuk/denetim/danışmanlık hizmeti sağlayıcıları</li>
                        <li>Teknik altyapı ve destek sağlayıcıları (CRM, e-posta, barındırma/hosting vb.)</li>
                    </ul>

                    <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">7.2 Yurtdışına Aktarım</h3>
                    <p>
                        Pasiflow operasyonlarının doğası gereği hizmet sağlayıcılarımızın sunucuları ve/veya Bağlı Şirketlerimiz ABD’de bulunabilir. Bu kapsamda kişisel verileriniz yurtdışına aktarılabilir.
                    </p>
                    <p className="mt-2">
                        Yurtdışına veri aktarımı yapılması halinde, KVKK’nın 9. maddesi uyarınca:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Kurul tarafından ilan edilen yeterli korumaya sahip ülkeler/şartlar veya</li>
                        <li>Uygun güvenceler (taahhütname, sözleşmesel güvenceler, teknik/idari önlemler) ve gerektiğinde açık rıza mekanizmaları kullanılacaktır.</li>
                    </ul>
                    <p className="mt-2">
                        Yurtdışındaki hizmet sağlayıcılar; barındırma (hosting), e-posta gönderimi, analiz, CRM ve müşteri destek yazılımları gibi altyapı hizmetleri sunabilir.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">8. Saklama Süresi (Veri Saklama ve İmha)</h2>
                    <p>
                        Kişisel verileriniz, işleme amaçları için gerekli olan süre boyunca ve ilgili mevzuatta öngörülen asgari saklama süreleri kadar muhafaza edilir. Süre sonunda veriler; KVKK ve ilgili mevzuata uygun şekilde silinir, yok edilir veya anonim hale getirilir.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">9. Çerezler (Cookies) ve Benzeri Teknolojiler</h2>
                    <p>
                        Web sitemizde kullanıcı deneyimini geliştirmek, güvenliği sağlamak, trafik analizi yapmak ve (varsa) pazarlama faaliyetlerini yürütmek amacıyla çerezler ve benzeri teknolojiler kullanılabilir.
                    </p>
                    <p className="mt-2">
                        Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilir veya engelleyebilirsiniz. Bazı çerezlerin engellenmesi halinde Site’nin bazı özellikleri beklenen şekilde çalışmayabilir.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">10. KVKK Kapsamındaki Haklarınız (KVKK m.11)</h2>
                    <p>KVKK’nın 11. maddesi uyarınca şu haklara sahipsiniz:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                        <li>Yurtiçinde/yurtdışında aktarıldığı üçüncü kişileri bilme</li>
                        <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
                        <li>KVKK m.7 çerçevesinde silinmesini/yok edilmesini isteme</li>
                        <li>Düzeltme/silme/yok etme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
                        <li>Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                        <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">11. Başvuru Yöntemi</h2>
                    <p>
                        KVKK kapsamındaki taleplerinizi <a href="mailto:info@pasiflow.com" className="text-primary hover:underline">info@pasiflow.com</a> adresine e-posta göndererek iletebilirsiniz. Başvurunuzda:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Ad-soyad</li>
                        <li>Başvuru konusu</li>
                        <li>İletişim bilgileriniz</li>
                        <li>Talebinize ilişkin açıklamalar</li>
                    </ul>
                    <p className="mt-2">
                        Şirket, başvuruları KVKK ve ilgili mevzuat uyarınca en geç 30 gün içinde sonuçlandırır. Kimlik doğrulaması amacıyla ek bilgi/belge talep edebiliriz.
                    </p>
                </div>

                <div className="pt-8 border-t border-slate-200">
                    <p className="font-bold text-slate-900">KVKK Aydınlatma Metni | Pasiflow</p>
                    <p className="text-sm italic mt-1">“Yatırım danışmanınız hazır.”</p>
                </div>
            </div>
        </div>
    )
}
