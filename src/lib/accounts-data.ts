export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

export type PlatformAccount = {
  id: string;
  name: string;
  logo?: string;
  brandColor?: string;
  balance: number;
  weeklyEarnings: number;
  transactions: Transaction[];
};

// Full catalog of platforms a user could connect. Only a subset is
// "connected" at any given time (tracked in AppStateProvider).
export const PLATFORM_CATALOG: PlatformAccount[] = [
  {
    id: "ifood",
    name: "iFood",
    logo: "/logos/ifood.svg",
    balance: 400,
    weeklyEarnings: 612,
    transactions: [
      { id: "if-1", date: "2026-07-01", description: "Entrega — Pinheiros", amount: 18.5 },
      { id: "if-2", date: "2026-07-01", description: "Entrega — Vila Madalena", amount: 14.9 },
      { id: "if-3", date: "2026-06-30", description: "Entrega — Itaim Bibi", amount: 22.3 },
      { id: "if-4", date: "2026-06-29", description: "Bônus por avaliação", amount: 10 },
      { id: "if-5", date: "2026-06-28", description: "Entrega — Moema", amount: 16.2 },
    ],
  },
  {
    id: "rappi",
    name: "Rappi",
    logo: "/logos/rappi.svg",
    brandColor: "#FF441F",
    balance: 250,
    weeklyEarnings: 388,
    transactions: [
      { id: "ra-1", date: "2026-07-01", description: "Entrega — Consolação", amount: 15.4 },
      { id: "ra-2", date: "2026-06-30", description: "Entrega — Bela Vista", amount: 19.8 },
      { id: "ra-3", date: "2026-06-28", description: "Entrega — Liberdade", amount: 12.6 },
    ],
  },
  {
    id: "99",
    name: "99",
    logo: "/logos/99.svg",
    balance: 150,
    weeklyEarnings: 245,
    transactions: [
      { id: "99-1", date: "2026-07-02", description: "Corrida — Faria Lima", amount: 21.9 },
      { id: "99-2", date: "2026-06-30", description: "Corrida — Paulista", amount: 17.4 },
      { id: "99-3", date: "2026-06-29", description: "Corrida — Jardins", amount: 13.7 },
    ],
  },
  {
    id: "uber",
    name: "Uber",
    logo: "/logos/uber.svg",
    balance: 180,
    weeklyEarnings: 290,
    transactions: [
      { id: "ub-1", date: "2026-07-02", description: "Corrida — Pinheiros", amount: 24.1 },
      { id: "ub-2", date: "2026-06-29", description: "Corrida — Vila Olímpia", amount: 19.3 },
    ],
  },
  {
    id: "99food",
    name: "99Food",
    logo: "/logos/99food.svg",
    balance: 95,
    weeklyEarnings: 150,
    transactions: [
      { id: "9f-1", date: "2026-07-01", description: "Entrega — Santana", amount: 13.2 },
      { id: "9f-2", date: "2026-06-28", description: "Entrega — Tucuruvi", amount: 11.6 },
    ],
  },
  {
    id: "loggi",
    name: "Lalamove",
    logo: "/logos/loggi.svg",
    balance: 70,
    weeklyEarnings: 110,
    transactions: [
      { id: "lg-1", date: "2026-06-30", description: "Entrega — Centro", amount: 9.8 },
      { id: "lg-2", date: "2026-06-27", description: "Entrega — Sé", amount: 12.4 },
    ],
  },
  {
    id: "ze-delivery",
    name: "Zé Delivery",
    logo: "/logos/ze-delivery.svg",
    balance: 60,
    weeklyEarnings: 95,
    transactions: [
      { id: "ze-1", date: "2026-06-29", description: "Entrega — Perdizes", amount: 8.9 },
      { id: "ze-2", date: "2026-06-26", description: "Entrega — Lapa", amount: 10.1 },
    ],
  },
  {
    id: "ubereats",
    name: "Uber Eats",
    logo: "/logos/ubereats.svg",
    balance: 130,
    weeklyEarnings: 205,
    transactions: [
      { id: "ue-1", date: "2026-07-01", description: "Entrega — Brooklin", amount: 16.7 },
      { id: "ue-2", date: "2026-06-28", description: "Entrega — Campo Belo", amount: 14.3 },
    ],
  },
  {
    id: "bee",
    name: "Bee Delivery",
    logo: "/logos/bee.svg",
    balance: 45,
    weeklyEarnings: 72,
    transactions: [
      { id: "be-1", date: "2026-06-27", description: "Entrega — Água Branca", amount: 7.5 },
    ],
  },
  {
    id: "james",
    name: "James Delivery",
    logo: "/logos/james.svg",
    balance: 55,
    weeklyEarnings: 88,
    transactions: [
      { id: "ja-1", date: "2026-06-30", description: "Entrega — Butantã", amount: 9.2 },
    ],
  },
  {
    id: "indrive",
    name: "inDrive",
    logo: "/logos/indrive.svg",
    balance: 110,
    weeklyEarnings: 175,
    transactions: [
      { id: "id-1", date: "2026-07-02", description: "Corrida — Mooca", amount: 18.4 },
      { id: "id-2", date: "2026-06-29", description: "Corrida — Ipiranga", amount: 15.9 },
    ],
  },
  {
    id: "keeta",
    name: "Keeta",
    logo: "/logos/keeta.svg",
    balance: 65,
    weeklyEarnings: 100,
    transactions: [
      { id: "ke-1", date: "2026-06-28", description: "Entrega — Alto de Pinheiros", amount: 10.8 },
    ],
  },
];

export const INITIAL_CONNECTED_IDS = ["ifood", "rappi", "99"];

export const FEE_RATE = 0.04;

export function getTotalAvailable(accounts: PlatformAccount[]): number {
  return accounts.reduce((sum, account) => sum + account.balance, 0);
}

export function getWeeklyTotal(accounts: PlatformAccount[]): number {
  return accounts.reduce((sum, account) => sum + account.weeklyEarnings, 0);
}
