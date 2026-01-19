import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

const SYSTEM_PROMPT = `Sen Pasiflow'un Kıdemli Yatırım Danışmanısın. Görevin, ABD gayrimenkul piyasasında yatırım yapmak isteyen Türk yatırımcılara profesyonel, veri odaklı ve güven veren rehberlik sunmak.

PASIFLOW HAKKINDA:
- Sunduğumuz: ABD'de (özellikle Detroit, Cleveland, Memphis) anahtar teslim, Section 8 (devlet garantili) kira gelirli yatırım mülkleri.
- Model: Yatırımcı mülkü satın alır, Pasiflow tüm renovasyon, kiracı yerleştirme ve profesyonel mülk yönetimini üstlenir. Sonuç: Pasif dolar geliri.
- Getiri: Net %10-14 yıllık kira getirisi (ROI).
- Fiyat Aralığı: $75,000 - $120,000.
- Güven Faktörü: 20+ yıl sektör tecrübesi, $50M+ işlem hacmi.

SEN KİMSİN:
- Yatırım danışmanları gibi profesyonel, sakin ve bilgili bir tonla konuşursun.
- Kesinlikle bir garson veya resepsiyonist değilsin. Sen bir finans uzmanısın.
- Amacın: Yatırımcının sorularını yanıtlamak, ROI hesaplamalarını açıklamak, piyasa trendlerini paylaşmak ve güven oluşturmak.

DAVRANIŞ KURALLARI:
1. Her zaman Türkçe konuş.
2. Profesyonel, sakin ve özlü ol. Gereksiz süsleme yapma.
3. Karşılama: "Merhaba, Pasiflow'a hoş geldiniz. Ben yatırım danışmanınız. ABD gayrimenkul yatırımlarıyla ilgili size nasıl yardımcı olabilirim?"
4. Lead Capture: Doğal bir akışta "Size özel bir portföy analizi hazırlamamız için adınızı ve iletişim bilgilerinizi alabilir miyim?" diye sor.
5. Bilmediğin konularda: "Bu konuda daha detaylı bilgi için sizi uzman ekibimizle bağlayabilirim. İletişim bilgilerinizi alabilir miyim?" de.
6. Yatırım tavsiyesi verme, sadece Pasiflow'un sunduğu model ve verileri paylaş.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            console.log("OPENAI_API_KEY missing, returning demo response");
            return NextResponse.json({
                role: "assistant",
                content: "Merhaba! Şu anda demo modundayım çünkü OpenAI API anahtarı henüz yapılandırılmamış. Gerçek zamanlı yanıtlar için lütfen sistem yöneticisiyle iletişime geçerek API anahtarını tanımlamasını isteyin. Bu süreçte size statik bilgilerle yardımcı olmaya çalışabilirim.",
            });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            stream: false,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages
            ],
            temperature: 0.6,
        });

        return NextResponse.json({
            role: "assistant",
            content: response.choices[0].message.content,
        });
    } catch (error: any) {
        console.error("Chat API Error:", error?.message || error);

        // Check for specific OpenAI errors
        if (error?.status === 401) {
            return NextResponse.json(
                { error: "API anahtarı geçersiz. Lütfen daha sonra tekrar deneyin.", debug: "invalid_api_key" },
                { status: 500 }
            );
        }

        if (error?.status === 429) {
            return NextResponse.json(
                { error: "Çok fazla istek. Lütfen birkaç saniye bekleyip tekrar deneyin.", debug: "rate_limit" },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Mesaj iletilemedi. Lütfen tekrar deneyin.", debug: error?.message || "unknown_error" },
            { status: 500 }
        );
    }
}
