import logoImage from "@assets/file_0000000086086246b830a517a3f86ada_1755587300234.png";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: "home" | "features" | "rules" | "rating") => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const navItems = [
    { id: "home" as const, label: "الرئيسية", icon: "fas fa-home" },
    { id: "features" as const, label: "المميزات", icon: "fas fa-star" },
    { id: "rules" as const, label: "القوانين", icon: "fas fa-gavel" },
    { id: "rating" as const, label: "التقييم", icon: "fas fa-thumbs-up" },
  ];

  return (
    <header className="flex flex-col lg:flex-row justify-between items-center p-6 border-b border-white/10 mb-12 backdrop-blur-sm bg-black/20 rounded-2xl" data-testid="header">
      {/* Logo */}
      <div className="flex items-center mb-6 lg:mb-0" data-testid="logo">
        <img
          src={logoImage}
          alt="Venice Community Logo"
          className="w-24 h-16 ml-4 object-contain"
          data-testid="logo-image"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-3" data-testid="navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`nav-btn ${currentPage === item.id ? "active" : ""}`}
            data-testid={`nav-button-${item.id}`}
          >
            <i className={`${item.icon} ml-2`}></i>
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
