import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/signup", "/otp", "/forgot-password", "/reset-password", "/create-password", "/my-actions", "/my-profile", "/submit-an-action"],
      },
    ],
    sitemap: "https://theactionlist.com/sitemap.xml",
  };
}
