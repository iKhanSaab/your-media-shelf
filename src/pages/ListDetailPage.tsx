import { useParams, useNavigate } from "react-router-dom";
import { MOCK_LISTS, MOCK_ITEMS } from "@/data/mockData";
import ShelfCard from "@/components/ShelfCard";
import { ArrowLeft, BookOpen } from "lucide-react";

const ListDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const list = MOCK_LISTS.find((l) => l.id === id);

  if (!list) {
    return (
      <div className="pb-24 px-4 pt-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">List not found.</p>
      </div>
    );
  }

  const items = list.itemIds
    .map((itemId) => MOCK_ITEMS.find((i) => i.id === itemId))
    .filter(Boolean);

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-9 w-9 rounded-full bg-card text-foreground"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold">{list.name}</h1>
          {list.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{list.description}</p>
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {items.map((item) => (
            <ShelfCard key={item!.id} item={item!} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="font-display text-lg text-muted-foreground">This list is empty</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-6 text-center">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>
    </div>
  );
};

export default ListDetailPage;
