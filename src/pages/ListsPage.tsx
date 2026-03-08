import { useState } from "react";
import { MOCK_LISTS, MOCK_ITEMS } from "@/data/mockData";
import { ShelfList } from "@/data/types";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronRight, BookOpen } from "lucide-react";

const ListsPage = () => {
  const navigate = useNavigate();
  const [lists] = useState<ShelfList[]>(MOCK_LISTS);

  const getListCovers = (list: ShelfList) => {
    return list.itemIds
      .map((id) => MOCK_ITEMS.find((i) => i.id === id))
      .filter(Boolean)
      .slice(0, 4);
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Lists</h1>
        <button className="flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium">
          <Plus size={14} />
          New List
        </button>
      </div>

      <div className="space-y-4">
        {lists.map((list) => {
          const covers = getListCovers(list);
          return (
            <div
              key={list.id}
              onClick={() => navigate(`/lists/${list.id}`)}
              className="rounded-xl bg-card p-4 cursor-pointer hover:bg-shelf-warm transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Cover mosaic */}
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden grid grid-cols-2 grid-rows-2 gap-0.5 bg-muted">
                  {covers.length > 0 ? (
                    covers.map((item) => (
                      <img
                        key={item!.id}
                        src={item!.coverUrl}
                        alt={item!.title}
                        className="w-full h-full object-cover"
                      />
                    ))
                  ) : (
                    <div className="col-span-2 row-span-2 flex items-center justify-center">
                      <BookOpen size={24} className="text-muted-foreground" />
                    </div>
                  )}
                  {/* Fill empty slots */}
                  {covers.length > 0 && covers.length < 4 &&
                    Array.from({ length: 4 - covers.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="bg-shelf-warm" />
                    ))
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold">{list.name}</h3>
                  {list.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{list.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {list.itemIds.length} {list.itemIds.length === 1 ? "item" : "items"}
                  </p>
                </div>

                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>

      {lists.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="font-display text-lg text-muted-foreground">No lists yet</p>
          <p className="text-sm text-muted-foreground mt-1">Create your first curated collection</p>
        </div>
      )}
    </div>
  );
};

export default ListsPage;
