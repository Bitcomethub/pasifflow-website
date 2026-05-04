"use client"

import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SunumPage() {
    const t = useTranslations("sunum")

    return (
        <div className="bg-background pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center mb-8 space-y-3">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
                        {t("title")}
                    </h1>
                </div>

                <Tabs defaultValue="how" className="w-full">
                    <TabsList className="mx-auto mb-6 h-11 w-full max-w-md grid grid-cols-2">
                        <TabsTrigger value="how" className="text-sm md:text-base">
                            {t("tab1")}
                        </TabsTrigger>
                        <TabsTrigger value="invest" className="text-sm md:text-base">
                            {t("tab2")}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="how">
                        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                            <iframe
                                src="/sunum-nasil-calisir.html"
                                title={t("tab1")}
                                className="w-full h-[80vh] min-h-[600px] border-0"
                                loading="lazy"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="invest">
                        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                            <iframe
                                src="/sunum-yatirim.html"
                                title={t("tab2")}
                                className="w-full h-[80vh] min-h-[600px] border-0"
                                loading="lazy"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
