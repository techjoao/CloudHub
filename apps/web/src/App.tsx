import { useState } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpFromLine, Cloud, Files, HardDrive,
  LayoutDashboard, Plus, Search, Settings, ShieldCheck, Trash2, Zap
} from "lucide-react";

type Account = {
  id: number;
  name: string;
  email: string;
  used: number;
  total: number;
  color: string;
  initials: string;
};

const initialAccounts: Account[] = [
  { id: 1, name: "Google Drive", email: "conta.principal@gmail.com", used: 42.8, total: 100, color: "#4285f4", initials: "G" },
  { id: 2, name: "Google Drive", email: "projetos@gmail.com", used: 8.2, total: 15, color: "#34a853", initials: "G" },
];

const formatStorage = (value: number) => value >= 1000 ? `${(value / 1000).toFixed(1)} TB` : `${value.toFixed(1)} GB`;

export default function App() {
  const [active, setActive] = useState("Visão geral");
  const [accounts] = useState(initialAccounts);
  const [query, setQuery] = useState("");
  const totalUsed = accounts.reduce((sum, account) => sum + account.used, 0);
  const totalStorage = accounts.reduce((sum, account) => sum + account.total, 0);
  const nav = [
    { label: "Visão geral", icon: LayoutDashboard },
    { label: "Meus arquivos", icon: Files },
    { label: "Transferências", icon: ArrowUpFromLine },
    { label: "Atividade", icon: Activity },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Cloud size={21} /></span><span>cloud<span className="brand-accent">hub</span></span></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list">
          {nav.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => setActive(label)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-label">PREFERÊNCIAS</div>
          <button className="nav-item"><Settings size={18} /><span>Configurações</span></button>
          <div className="sidebar-status"><span className="status-dot" /> Todos os sistemas operacionais</div>
          <div className="profile"><div className="avatar">J</div><div><strong>Meu workspace</strong><small>Plano gratuito</small></div><Settings size={16} className="profile-settings" /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs">Workspace <span>/</span> <strong>{active}</strong></div>
          <div className="top-actions"><div className="system-pill"><span className="status-dot" /> Sistema estável</div><button className="icon-button" aria-label="Configurações"><Settings size={18} /></button><div className="avatar small">J</div></div>
        </header>

        <div className="page">
          <section className="welcome-row">
            <div><div className="eyebrow">SEU ESPAÇO DIGITAL</div><h1>Visão geral</h1><p className="subtitle">Tudo conectado. Tudo organizado. Em um só lugar.</p></div>
            <button className="primary-button"><Plus size={17} /> Conectar conta</button>
          </section>

          <section className="stats-grid">
            <article className="stat-card storage-card">
              <div className="stat-top"><span>Armazenamento total</span><span className="stat-icon purple"><HardDrive size={18} /></span></div>
              <div className="stat-value">{formatStorage(totalUsed)} <span>/ {formatStorage(totalStorage)}</span></div>
              <div className="progress-track"><div className="progress-fill purple-fill" style={{ width: `${(totalUsed / totalStorage) * 100}%` }} /></div>
              <div className="stat-foot"><span>{Math.round((totalUsed / totalStorage) * 100)}% utilizado</span><span>{formatStorage(totalStorage - totalUsed)} livres</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Contas conectadas</span><span className="stat-icon blue"><Cloud size={18} /></span></div>
              <div className="stat-value">{accounts.length.toString().padStart(2, "0")} <span>contas</span></div>
              <div className="stat-foot standalone">Suas nuvens em um só painel</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Arquivos gerenciados</span><span className="stat-icon green"><Files size={18} /></span></div>
              <div className="stat-value">— <span>arquivos</span></div>
              <div className="stat-foot standalone">Aguardando conexão com o Drive</div>
            </article>
          </section>

          <section className="section-heading"><div><h2>Suas contas</h2><p>Gerencie o armazenamento de cada serviço conectado.</p></div><button className="text-button"><Plus size={16} /> Adicionar conta</button></section>
          <section className="accounts-list">
            {accounts.map(account => (
              <article className="account-row" key={account.id}>
                <div className="provider-icon" style={{ background: account.color }}>{account.initials}</div>
                <div className="account-info"><strong>{account.name}</strong><span>{account.email}</span></div>
                <div className="account-usage"><div className="usage-label"><strong>{formatStorage(account.used)}</strong><span>de {formatStorage(account.total)}</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${(account.used / account.total) * 100}%`, background: account.color }} /></div></div>
                <div className="connected"><span className="status-dot" /> Conectado</div>
                <button className="more-button" aria-label="Mais opções">···</button>
              </article>
            ))}
          </section>

          <section className="bottom-grid">
            <article className="info-card"><div className="info-icon"><ShieldCheck size={19} /></div><div><h3>Seus dados, sob seu controle</h3><p>O CloudHub não move seus arquivos sem sua autorização. Suas contas continuam independentes.</p><button className="learn-link">Entenda como funciona <ArrowDownToLine size={14} /></button></div></article>
            <article className="info-card accent-card"><div className="info-icon"><Zap size={19} /></div><div><h3>Um só lugar para tudo</h3><p>Conecte suas contas e tenha uma visão unificada do seu espaço na nuvem.</p></div></article>
          </section>
          <footer>CloudHub <span>•</span> Construindo uma experiência melhor para seus arquivos.</footer>
        </div>
      </main>
    </div>
  );
}