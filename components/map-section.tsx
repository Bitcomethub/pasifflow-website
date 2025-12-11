"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function MapSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Fırsat Bölgeleri</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-12">
            Şu anda Ohio, Missouri, Tennessee ve Michigan eyaletlerinde en yüksek kira getirili bölgeleri hedefliyoruz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 p-2 md:p-4 backdrop-blur-sm shadow-2xl"
        >
          {/* Placeholder for real map visualization - Using a dark map style for premium feel */}
          <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#1a1f35] flex items-center justify-center group">
            {/* Abstract Map Background */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_(states_only).svg')] bg-contain bg-center bg-no-repeat"></div>

            {/* Animated Pins/Hotspots */}
            <div className="absolute top-[35%] right-[25%] flex flex-col items-center group/pin cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
              </span>
              <span className="mt-2 text-xs font-bold text-white opacity-0 group-hover/pin:opacity-100 transition-opacity">Cleveland, OH</span>
            </div>

            <div className="absolute top-[48%] right-[32%] flex flex-col items-center group/pin cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animation-delay-500"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
              </span>
              <span className="mt-2 text-xs font-bold text-white opacity-0 group-hover/pin:opacity-100 transition-opacity">St. Louis, MO</span>
            </div>

            <div className="absolute top-[38%] right-[28%] flex flex-col items-center group/pin cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animation-delay-1000"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
              </span>
              <span className="mt-2 text-xs font-bold text-white opacity-0 group-hover/pin:opacity-100 transition-opacity">Detroit, MI</span>
            </div>

            <div className="relative z-10 text-center space-y-2 pointer-events-none">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">16+ Aktif Eyalet</h3>
              <p className="text-sm md:text-base text-gray-300">Yüksek Kira Getirili &amp; Değer Artışı Hedefli</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button variant="secondary" size="lg" className="font-semibold text-primary w-full sm:w-auto">
            Bölgeleri İncele
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white bg-transparent w-full sm:w-auto">
            Eyalet Raporlarını İste
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
