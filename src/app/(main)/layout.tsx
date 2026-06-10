import type { Metadata } from "next";
import HeaderSection from "@/components/Header/page";
import NewsletterSection from "@/components/Newsletter/page";
import FooterSection from "@/components/Footer/page";
import { buildMetadata } from "@/lib/seo";
import { HOME_SEO_TITLE, HOME_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = {
  ...buildMetadata({ title: HOME_SEO_TITLE, description: HOME_SEO_DESCRIPTION }),
  title: { absolute: HOME_SEO_TITLE },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSection />
      {children}
      <NewsletterSection />
      <FooterSection />
    </>
  );
}
