// Shared hot deals data for mobile APIs
// Source of truth: website portfolio-section.tsx (6 Detroit properties)
// This file is used by both investor dashboard and agent dashboard APIs

export interface HotDeal {
    id: string;
    address: string;
    city: string;
    price: number;
    monthlyRent: number;
    capRate: number;
    cashOnCash: number;
    netYearly: number;
    image: string;
    status: string;
    tag: string;
    section8: boolean;
    mls: string;
    rooms: number;
    bathrooms: number;
    sqft: number;
}

const IMAGE_BASE = 'https://pasiflow.com/properties';

export const HOT_DEALS: HotDeal[] = [
    {
        id: 'hot-1',
        address: '10468 Nottingham St',
        city: 'Detroit, MI 48224',
        price: 130000,
        monthlyRent: 1500,
        capRate: 13.3,
        cashOnCash: 12.6,
        netYearly: 5076,
        image: `${IMAGE_BASE}/nottingham-hd.jpg`,
        status: 'Featured',
        tag: 'Section 8 Onaylı',
        section8: true,
        mls: '20251070001',
        rooms: 3,
        bathrooms: 1,
        sqft: 1200,
    },
    {
        id: 'hot-2',
        address: '12152 Stout St',
        city: 'Detroit, MI 48228',
        price: 85900,
        monthlyRent: 1160,
        capRate: 9.8,
        cashOnCash: 11.2,
        netYearly: 9181,
        image: `${IMAGE_BASE}/stout-hd.jpg`,
        status: 'Back on Market',
        tag: 'Section 8 Onaylı',
        section8: true,
        mls: '20251049787',
        rooms: 3,
        bathrooms: 1,
        sqft: 1041,
    },
    {
        id: 'hot-3',
        address: '12290 Griggs St',
        city: 'Detroit, MI 48204',
        price: 89900,
        monthlyRent: 1100,
        capRate: 8.6,
        cashOnCash: 10.8,
        netYearly: 8433,
        image: `${IMAGE_BASE}/griggs-hd.jpg`,
        status: 'Yeni İlan',
        tag: 'Section 8 Onaylı',
        section8: true,
        mls: '20251060129',
        rooms: 3,
        bathrooms: 1,
        sqft: 1383,
    },
    {
        id: 'hot-4',
        address: '15717 Freeland St',
        city: 'Detroit, MI 48227',
        price: 87900,
        monthlyRent: 1165,
        capRate: 9.6,
        cashOnCash: 11.5,
        netYearly: 9185,
        image: `${IMAGE_BASE}/freeland-hd.jpg`,
        status: 'Satılık',
        tag: 'Section 8 Onaylı',
        section8: true,
        mls: '20251059784',
        rooms: 3,
        bathrooms: 1,
        sqft: 1227,
    },
    {
        id: 'hot-5',
        address: '9977 Evergreen Ave',
        city: 'Detroit, MI 48228',
        price: 88900,
        monthlyRent: 1354,
        capRate: 11.6,
        cashOnCash: 13.1,
        netYearly: 11201,
        image: `${IMAGE_BASE}/evergreen-hd.jpg`,
        status: 'Satılık',
        tag: 'Section 8 Onaylı',
        section8: true,
        mls: '20251050193',
        rooms: 3,
        bathrooms: 1,
        sqft: 1150,
    },
    {
        id: 'hot-6',
        address: '12345 Kentucky St',
        city: 'Detroit, MI 48204',
        price: 89000,
        monthlyRent: 1224,
        capRate: 10.1,
        cashOnCash: 11.8,
        netYearly: 9754,
        image: `${IMAGE_BASE}/kentucky-hd.jpg`,
        status: 'Satılık',
        tag: 'Section 8 Onaylı',
        section8: true,
        mls: '20251040564',
        rooms: 3,
        bathrooms: 1,
        sqft: 1357,
    },
];
