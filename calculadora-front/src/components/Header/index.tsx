import Title from "../Title";
export function Header() {
    return (
        <header className="w-full bg-blue-700 shadow sticky top-0 z-10">
        <div className="flex items-center gap-4 py-4 px-6">
          <span className="bg-white rounded-full p-1 shadow flex">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="2" width="18" height="20" rx="4" fill="#1976d2"/><rect x="6" y="5" width="12" height="3" rx="1.5" fill="#fff"/><rect x="7" y="10" width="3" height="3" rx="1.5" fill="#fff"/><rect x="7" y="15" width="3" height="3" rx="1.5" fill="#fff"/><rect x="14" y="10" width="3" height="3" rx="1.5" fill="#fff"/><rect x="14" y="15" width="3" height="3" rx="1.5" fill="#fff"/></svg>
          </span>
          <Title as="h1" className="text-white">Calculadora de Empréstimos</Title>
        </div>
      </header>
    )
}