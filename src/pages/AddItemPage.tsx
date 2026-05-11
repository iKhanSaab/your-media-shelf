import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Link as LinkIcon, Search, Loader2, Sparkles } from "lucide-react";
import { MOCK_ITEMS, MOCK_LISTS } from "@/data/mockData";
import { ContentType } from "@/data/types";
import ContentTypeBadge from "@/components/ContentTypeBadge";
import { toast } from "sonner";

type ScrapedResult = {
  title: string;
  type: ContentType;
  coverUrl: string;
  source: string;
  chapters?: number;
  episodes?: number;
};

// Mock scraper — detect type from URL host and return fake metadata.
const mockScrape = (url: string): ScrapedResult | null => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    let type: ContentType = "book";
    if (host.includes("imdb") || host.includes("themoviedb") || host.includes("letterboxd")) type = "movie";
    else if (host.includes("myanimelist") || host.includes("anilist")) type = "anime";
    else if (host.includes("goodreads") || host.includes("openlibrary") || host.includes("royalroad") || host.includes("webnovel") || host.includes("wattpad") || host.includes("archiveofourown") || host.includes("fanfiction")) type = "book";
    else if (host.includes("igdb") || host.includes("steam")) type = "game";
    else if (host.includes("spotify") || host.includes("apple.com/podcast")) type = "podcast";
    else if (host.includes("netflix") || host.includes("hulu") || host.includes("hbo")) type = "tv";

    const slug = (u.pathname.split("/").filter(Boolean).pop() || "Untitled")
      .replace(/[-_]/g, " ")
      .replace(/\.\w+$/, "");
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
      title,
      type,
      coverUrl: `https://picsum.photos/seed/${encodeURIComponent(host + slug)}/400/600`,
      source: host,
      chapters: type === "book" ? Math.floor(Math.random() * 80) + 10 : undefined,
      episodes: type === "tv" || type === "anime" ? Math.floor(Math.random() * 24) + 6 : undefined,
    };
  } catch {
    return null;
  }
};

const AddItemPage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [scraping, setScraping] = useState(false);
  const [result, setResult] = useState<ScrapedResult | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<string>(MOCK_LISTS[0]?.id ?? "");

  const handleScrape = async () => {
    if (!url.trim()) return;
    setScraping(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 900));
    const r = mockScrape(url.trim());
    setScraping(false);
    if (!r) {
      toast.error("Couldn't read that link. Try a different URL.");
      return;
    }
    setResult(r);
  };

  const handleAdd = () => {
    if (!result) return;
    toast.success(`Added "${result.title}" to ${MOCK_LISTS.find((l) => l.id === selectedShelf)?.name ?? "shelf"}`);
    navigate("/");
  };

  const searchResults =
    query.length > 0
      ? MOCK_ITEMS.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
      : [];

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
        <h1 className="text-2xl font-display font-bold">Add to Shelf</h1>
      </div>

      {/* Paste link */}
      <section className="mb-6">
        <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2">
          Paste a link
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="goodreads.com, imdb.com, myanimelist.net…"
              className="w-full rounded-xl bg-card border border-border pl-9 pr-3 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button
            onClick={handleScrape}
            disabled={scraping || !url}
            className="rounded-xl bg-primary text-primary-foreground px-4 text-sm font-medium disabled:opacity-50 flex items-center gap-1.5"
          >
            {scraping ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={14} />}
            Fetch
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5">
          Works with any media link — we'll pull the title, cover, and details.
        </p>
      </section>

      {/* Scraped preview */}
      {result && (
        <section className="mb-6 rounded-xl bg-card border border-border p-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex gap-3">
            <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <img src={result.coverUrl} alt={result.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base font-semibold leading-tight">{result.title}</h3>
              <div className="mt-1">
                <ContentTypeBadge type={result.type} size={12} />
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">Source: {result.source}</p>
              {result.chapters && (
                <p className="text-[11px] text-muted-foreground">{result.chapters} chapters</p>
              )}
              {result.episodes && (
                <p className="text-[11px] text-muted-foreground">{result.episodes} episodes</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[11px] uppercase tracking-wider font-medium text-muted-foreground mb-1.5">
              Add to shelf
            </label>
            <select
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
              className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm"
            >
              {MOCK_LISTS.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="w-full mt-3 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-medium"
          >
            Add to Shelf
          </button>
        </section>
      )}

      {/* Search existing */}
      <section>
        <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2">
          Or search your shelf
        </label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles…"
            className="w-full rounded-xl bg-card border border-border pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2 mt-3">
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="w-full flex items-center gap-3 rounded-xl bg-card p-3 hover:bg-shelf-warm transition-colors text-left"
              >
                <div className="h-14 w-10 flex-shrink-0 overflow-hidden rounded-md">
                  <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                  <ContentTypeBadge type={item.type} size={12} />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AddItemPage;
