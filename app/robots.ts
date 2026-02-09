import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard/", "/agent/", "/admin/", "/api/"],
        },
        sitemap: "https://pasiflow.com/sitemap.xml",
    }
}
