import { Link, Image, LogoPng, LOGO_ARIA_LABEL, ADMIN_HOME_HREF } from "./import";

interface AdminHeaderProps {
  rightSlot?: React.ReactNode;
}

const AdminHeader = ({ rightSlot }: AdminHeaderProps = {}) => {
  return (
    <div
      className="sticky top-0 z-20 bg-white"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <header className="max-w-360 mx-auto py-5 flex items-center justify-between px-5 lg:px-8 xl:px-15">
        <Link href={ADMIN_HOME_HREF} prefetch={false} className="shrink-0">
          <Image src={LogoPng} alt={LOGO_ARIA_LABEL} className="h-10 md:h-12 xl:h-15.5 w-auto" />
        </Link>
        {rightSlot}
      </header>
    </div>
  );
};

export default AdminHeader;
