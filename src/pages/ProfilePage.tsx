import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, Settings, Palette, Download, Upload, ChevronRight, Eye, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { MOCK_ITEMS } from "@/data/mockData";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [spoilerSafe, setSpoilerSafe] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const completed = MOCK_ITEMS.filter((i) => i.status === "completed").length;
  const inProgress = MOCK_ITEMS.filter((i) => ["watching", "reading", "playing"].includes(i.status)).length;
  const ratedItems = MOCK_ITEMS.filter((i) => i.rating);
  const avgRating = ratedItems.length
    ? (ratedItems.reduce((s, i) => s + (i.rating || 0), 0) / ratedItems.length).toFixed(1)
    : "—";

  const Row = ({
    icon: Icon,
    label,
    onClick,
    right,
  }: {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    right?: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-shelf-warm transition-colors text-left"
    >
      <Icon size={18} className="text-muted-foreground" />
      <span className="flex-1 text-sm">{label}</span>
      {right ?? <ChevronRight size={16} className="text-muted-foreground" />}
    </button>
  );

  const Toggle = ({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) => (
    <span
      role="switch"
      aria-checked={on}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!on);
      }}
      className={`inline-block h-6 w-10 rounded-full transition-colors relative cursor-pointer ${
        on ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
  );

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex items-center justify-center h-9 w-9 rounded-full bg-card border border-border"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-display font-bold">Profile</h1>
      </div>

      {/* Identity */}
      <div className="rounded-2xl bg-card border border-border p-5 mb-6 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-shelf-amber-light flex items-center justify-center font-display text-2xl font-bold text-primary mb-2">
          S
        </div>
        <p className="font-display text-lg font-semibold">Your Shelf</p>
        <p className="text-xs text-muted-foreground">{MOCK_ITEMS.length} items tracked</p>
      </div>

      {/* Stats */}
      <h2 className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2 px-1">
        Stats
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="rounded-xl bg-card border border-border p-3 text-center">
          <p className="font-display text-2xl font-bold">{completed}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Completed</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-3 text-center">
          <p className="font-display text-2xl font-bold">{inProgress}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">In Progress</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-3 text-center">
          <p className="font-display text-2xl font-bold">{avgRating}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Avg Rating</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/stats")}
        className="w-full flex items-center justify-between rounded-xl bg-shelf-amber-light p-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <BarChart3 size={20} className="text-primary" />
          <span className="text-sm font-medium">Full Activity</span>
        </div>
        <ChevronRight size={16} className="text-muted-foreground" />
      </button>

      {/* Customization */}
      <h2 className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2 px-1">
        Customization
      </h2>
      <div className="rounded-xl bg-card border border-border overflow-hidden mb-6 divide-y divide-border">
        <Row icon={Palette} label="Theme & accent" />
        <Row
          icon={Moon}
          label="Dark mode"
          onClick={() => setDark(!dark)}
          right={<Toggle on={dark} onChange={setDark} />}
        />
        <Row
          icon={Eye}
          label="Spoiler-safe browsing"
          onClick={() => setSpoilerSafe(!spoilerSafe)}
          right={<Toggle on={spoilerSafe} onChange={setSpoilerSafe} />}
        />
      </div>

      {/* Settings */}
      <h2 className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2 px-1">
        Settings
      </h2>
      <div className="rounded-xl bg-card border border-border overflow-hidden divide-y divide-border">
        <Row icon={Upload} label="Import (Goodreads, Letterboxd, MAL)" />
        <Row icon={Download} label="Export shelf data" />
        <Row icon={Settings} label="About SHELF" />
      </div>
    </div>
  );
};

export default ProfilePage;
