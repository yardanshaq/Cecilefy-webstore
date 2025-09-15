export const siteConfig = {
  name: "Cecilefy",
  description: "Platform Pterodactyl Panel Hosting Terpercaya",
  domain: "cecilefy.xyz",
  url: "https://cecilefy.xyz",
  contact: {
    telegram: {
      username: "@yardanshaqq", // Data dummy - ganti dengan username real
      group: "https://t.me/+dummy_group_link", // Data dummy - ganti dengan link grup real
      url: "https://t.me/cecilefy_admin"
    },
    email: "gg@cecilefy.xyz"
  },
  social: {
    twitter: "https://x.com/cecilefy",
    telegram: "https://t.me/cecilefy_admin", 
    instagram: "https://instagram.com/cecilefy"
  },
  // Statistik platform - update sesuai data real
  statistics: {
    totalUsers: 2,
    totalServers: 2,
    totalPurchases: 0,
    lastUpdated: new Date().toISOString()
  },
  // Data dummy untuk pengajuan merchant Tripay - JANGAN PUBLISH
  tripay: {
    merchantCode: "T45293", // Data dummy
    privateKey: "U79sH-NPOs3-gyCzL-o5AhU-ROeLY", // Data dummy
    apiKey: "DEV-1ADSsFrlj5z29U9vIMoPn3XvDsBwzTeJhHwWDbEe" // Data dummy
  }, 
  panels: {
    private: {
      name: "Private Panel",
      description: "Panel Pterodactyl dengan akses private dan performa optimal",
      packages: [
        { ram: 1, price: 2000, label: "1GB RAM" },
        { ram: 2, price: 3500, label: "2GB RAM" },
        { ram: 3, price: 4500, label: "3GB RAM" },
        { ram: 4, price: 5500, label: "4GB RAM" },
        { ram: 5, price: 6500, label: "5GB RAM" },
        { ram: 6, price: 7500, label: "6GB RAM" },
        { ram: 7, price: 8500, label: "7GB RAM" },
        { ram: 8, price: 9500, label: "8GB RAM" },
        { ram: 9, price: 10500, label: "9GB RAM" },
        { ram: 10, price: 11000, label: "10GB RAM" },
        { ram: -1, price: 13000, label: "Unlimited RAM" }
      ]
    },
    public: {
      name: "Public Panel", 
      description: "Panel Pterodactyl dengan akses shared yang ekonomis",
      packages: [
        { ram: 3, price: 1000, label: "3GB RAM" },
        { ram: 4, price: 2000, label: "4GB RAM" },
        { ram: 5, price: 2500, label: "5GB RAM" },
        { ram: 6, price: 3000, label: "6GB RAM" },
        { ram: 7, price: 3500, label: "7GB RAM" },
        { ram: 8, price: 4000, label: "8GB RAM" },
        { ram: 9, price: 4500, label: "9GB RAM" },
        { ram: 10, price: 5000, label: "10GB RAM" },
        { ram: -1, price: 5000, label: "Unlimited RAM" }
      ]
    }
  }
}