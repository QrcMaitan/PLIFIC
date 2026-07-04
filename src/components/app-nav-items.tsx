import { IconHome, IconLink, IconList } from "@/components/icons";

export type AppNavItem = {
  href: string;
  label: string;
  icon: typeof IconHome;
  enabled: boolean;
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/app", label: "Visão Geral", icon: IconHome, enabled: true },
  { href: "/app/extrato", label: "Extrato", icon: IconList, enabled: false },
  {
    href: "/app/contas",
    label: "Contas conectadas",
    icon: IconLink,
    enabled: false,
  },
];
