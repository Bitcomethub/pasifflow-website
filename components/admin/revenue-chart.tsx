"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

export type RevenuePoint = { month: string; revenue: number }

const fmtUsd = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
    const hasData = data.some((d) => d.revenue > 0)

    if (!hasData) {
        return (
            <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">
                Son 6 ay için ödeme kaydı bulunmuyor.
            </div>
        )
    }

    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                    cursor={{ fill: "rgba(184, 160, 116, 0.08)" }}
                    contentStyle={{
                        background: "#1F2328",
                        border: "none",
                        borderRadius: 12,
                        color: "white",
                        fontSize: 12,
                    }}
                    labelStyle={{ color: "#A8B0B8" }}
                    formatter={(value: number) => [fmtUsd(value), "Gelir"]}
                />
                <Bar dataKey="revenue" fill="#B8A074" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
