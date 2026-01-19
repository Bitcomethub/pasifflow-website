"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from "next-intl"
import { TrendingUp, Building2, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export function FoundersSection() {
  const t = useTranslations("founders")

  const founders = [
    {
      initials: "EA",
      name: t("founder1Name"),
      title: t("founder1Title"),
      bio: t("founder1Bio"),
      image: "/founders/erman.jpg"
    },
    {
      initials: "TK",
      name: t("founder2Name"),
      title: t("founder2Title"),
      bio: t("founder2Bio"),
      image: "/founders/tugce.jpg"
    },
    {
      initials: "CK",
      name: t("founder3Name"),
      title: t("founder3Title"),
      bio: t("founder3Bio"),
      image: "/founders/cem.jpg"
    },
  ]

  const stats = [
    { icon: TrendingUp, value: "20+", label: "Yıl ABD Tecrübesi" },
    { icon: DollarSign, value: "$100M+", label: "İşlem Hacmi" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.15,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section className="py-24 bg-background border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest mb-4 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Pasiflow Team
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground">
            {t("title")}<br />
            <span className="text-primary">{t("subtitle")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <stat.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {founders.map((founder, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
            >
              <Card className="group relative p-8 bg-white border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-900 via-orange-500 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-br from-slate-900 via-orange-500 to-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    <Avatar className="h-32 w-32 border-4 border-white relative z-10 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                      <AvatarImage
                        src={founder.image}
                        alt={founder.name}
                        className="object-cover object-top"
                      />
                      <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-600">
                        {founder.initials}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-xl text-slate-900">{founder.name}</h3>
                    <p className="text-sm font-medium text-orange-600 uppercase tracking-wide">{founder.title}</p>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-center text-sm">
                    {founder.bio}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

