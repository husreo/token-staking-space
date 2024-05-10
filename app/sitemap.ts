import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://spacefalcon.com",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 1,
    },
    {
      url: "https://spacefalcon.com/privacy-policy",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0.8,
    },
    {
      url: "https://spacefalcon.com/terms-of-use",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0.8,
    },
    {
      url: "https://spacefalcon.com/dashboard",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0.9,
    },
    {
      url: "https://spacefalcon.com/aviatrix",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0.9,
    },
    {
      url: "https://spacefalcon.com/branding-kit",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0.8,
    },
    {
      url: "https://spacefalcon.com/about-us",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0.8,
    },
    {
      url: "https://spacefalcon.com/referral-leaderboard",
      lastModified: "2023-12-01T04:26:02+00:00",
      priority: 0,
    },
  ];
}
