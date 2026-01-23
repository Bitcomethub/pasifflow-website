"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
    return (
        <section className="relative w-full bg-white">
            {/* Hero Section - Clean, Minimal, Fundrise-style */}
            <div className="relative w-full py-32 md:py-40 bg-[#F6F7F9] overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-6">
                            HAKKIMIZDA
                        </h2>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-secondary leading-[1.15]">
                            ABD'de pasif gelir yatırımının geleceğine hoş geldiniz.
                        </h1>
                    </motion.div>
                </div>
                {/* Subtle diagonal accent */}
                <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 translate-x-1/3" />
            </div>

            {/* Main Content Section - Storytelling */}
            <div className="py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Opening Statement */}
                        <p className="text-xl md:text-2xl text-secondary font-medium leading-relaxed mb-12">
                            Pasiflow'u tek bir fikirle kurduk: ABD'de kira gelirine dayalı gayrimenkul yatırımını, yurt dışındaki yatırımcı için{" "}
                            <span className="font-bold">anlaşılır, şeffaf ve yönetilebilir</span> hâle getirmek.
                        </p>

                        {/* Body Paragraphs - Lighter gray for flow */}
                        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Gayrimenkul, doğru kurgulandığında servet inşa etmenin en güçlü araçlarından biri. Fakat iş pratiğe gelince, özellikle ABD gibi uzaktan yönetilen bir pazarda süreç; doğru mülk seçimi, kiracı yerleştirme, bakım–onarım, mevzuat, sigorta, vergi ve profesyonel yönetim gibi birçok parçadan oluşur.
                            </p>
                            <p className="text-secondary font-medium">
                                Gerçekte yatırım, sadece "ev almak" değildir; başından sonuna iyi kurgulanmış bir operasyon gerektirir.
                            </p>
                            <p className="text-2xl font-bold text-primary">
                                Pasiflow tam bu noktada devreye girer.
                            </p>
                            <p>
                                Amacımız, yabancı yatırımcının en çok zorlandığı noktaları tek bir yapılandırılmış sistem altında toplamak. Nakit akışı ve kira potansiyeli odaklı fırsat analizi ve mülk seçimi yapıyor, Section 8 gibi kamu destekli kira programlarına uyum sürecini ve uygunluk kontrollerini yönetiyoruz. Kiracı iletişimi, detaylı raporlama ile bakım–onarım takibini kapsayan profesyonel mülk yönetimi sunarken, teknolojik altyapımız sayesinde yatırımcının portföyündeki her detayı tek bir panel üzerinden şeffaf biçimde izlemesini sağlıyoruz.
                            </p>
                        </div>

                        {/* First Question Highlight */}
                        <div className="my-16 py-8 border-y border-border">
                            <p className="text-lg text-muted-foreground italic">
                                Başlangıçta kendimize şu soruyu sorduk:
                            </p>
                            <p className="text-xl md:text-2xl font-medium text-secondary mt-4">
                                "Yurt dışındaki yatırımcı Amerika'da ev aldıktan sonra 'Şimdi ne olacak?' kaygısını yaşamadan bu süreci nasıl yönetebilir?"
                            </p>
                        </div>

                        {/* Focus Areas */}
                        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Bu yüzden <span className="font-semibold text-secondary">ölçülebilir nakit akışı, süreç standardı, düzenli raporlama ve şeffaf iletişim</span> üzerine odaklandık.
                            </p>
                            <p>
                                Pasiflow'u, uzaktan anlatan bir aracı firma gibi değil; <span className="font-bold text-secondary">sahayı bilen ve süreci gerçekten yöneten</span> bir ekip olarak kurguladık. Florida'da aktif broker tecrübesi +100M ve ABD piyasasındaki saha deneyimiyle, modelimizi "kâğıt üzerinde güzel görünen" değil, <span className="font-bold text-secondary">sahada gerçekten işleyen</span> bir sistem üzerine inşa ediyoruz.
                            </p>
                        </div>

                        {/* Blockquote - Featured Quote */}
                        <blockquote className="my-16 pl-6 border-l-4 border-primary bg-muted/30 py-6 pr-6 rounded-r-lg">
                            <p className="text-xl md:text-2xl font-medium text-secondary italic leading-relaxed">
                                "Bugün Pasiflow'da en çok gurur duyduğum şey, yatırımcılarımızın panelde gördüğü her rakamın, sahada çalışan gerçek bir sistemin sonucu olması."
                            </p>
                        </blockquote>

                        {/* Vision */}
                        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Bugün Pasiflow'daki hedefimiz net: Yurt dışındaki yatırımcının ABD'de <span className="font-bold text-secondary">kira geliri odaklı mülk portföyünü</span>, adım adım ve <span className="font-bold text-secondary">kontrol edilebilir risklerle</span> kurabileceği bir sistem sunmak.
                            </p>
                            <p className="text-secondary font-medium">
                                Yatırımcıya her zaman şu hissi vermek istiyoruz:
                            </p>
                        </div>

                        {/* Second Blockquote */}
                        <blockquote className="my-12 pl-6 border-l-4 border-slate-300 py-4">
                            <p className="text-xl font-medium text-secondary italic">
                                "Ben uzaktayım ama her şey gözümün önünde."
                            </p>
                        </blockquote>

                        {/* Closing Statement */}
                        <div className="space-y-6 text-lg leading-relaxed">
                            <p className="text-2xl font-bold text-secondary">
                                Pasiflow'a hoş geldiniz.
                            </p>
                            <p className="text-muted-foreground">
                                ABD'de pasif gelir yatırımı için, güvenilir, şeffaf ve sistemli bir yol inşa ediyoruz.
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mt-16 pt-8 border-t border-border flex items-center gap-6">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                                <Image
                                    src="/erman-adanir.jpg"
                                    alt="Erman Adanır"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-secondary">Erman Adanır</p>
                                <p className="text-muted-foreground">Co-founder & CEO, <span className="font-semibold">Pasiflow LLC</span></p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
