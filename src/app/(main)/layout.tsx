import HeaderSection from "@/components/Header/page";
import NewsletterSection from "@/components/Newsletter/page";
import FooterSection from "@/components/Footer/page";

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
