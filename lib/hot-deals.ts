export interface HotDeal {
    id: string;
    title: string;
    address: string;
    price: number;
    monthlyRent: number;
    roi: number;
    image: string;
    tag: string;
    section8: boolean;
    mls: string;
}

export const HOT_DEALS: HotDeal[] = [
    { id: 'hot-1', title: '18921 Nottingham Rd', address: 'Detroit, MI 48236', price: 79900, monthlyRent: 1050, roi: 15.8, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80', tag: 'Yeni Fırsat', section8: true, mls: '20251038421' },
    { id: 'hot-2', title: '12152 Stout St', address: 'Detroit, MI 48228', price: 85900, monthlyRent: 1160, roi: 16.2, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80', tag: 'Section 8 Onaylı', section8: true, mls: '20251049787' },
    { id: 'hot-3', title: '12290 Griggs St', address: 'Detroit, MI 48204', price: 89900, monthlyRent: 1100, roi: 14.7, image: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=800&auto=format&fit=crop&q=80', tag: 'Yeni İlan', section8: true, mls: '20251060129' },
    { id: 'hot-4', title: '15717 Freeland St', address: 'Detroit, MI 48227', price: 87900, monthlyRent: 1200, roi: 16.4, image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=80', tag: 'Yüksek Kira', section8: true, mls: '20251055672' },
    { id: 'hot-5', title: '9977 Evergreen Ave', address: 'Detroit, MI 48228', price: 88900, monthlyRent: 1350, roi: 18.3, image: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=800&auto=format&fit=crop&q=80', tag: 'En Yüksek Getiri', section8: true, mls: '20251050193' },
    { id: 'hot-6', title: '12345 Kentucky St', address: 'Detroit, MI 48204', price: 89000, monthlyRent: 1200, roi: 16.5, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80', tag: 'Section 8 Ready', section8: true, mls: '20251040564' },
];
