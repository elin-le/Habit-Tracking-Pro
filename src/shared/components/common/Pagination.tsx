import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGINATION_ELLIPSIS } from "../../constants/appConstants";
import { Button } from "../ui/Button";
import { useTranslation } from "react-i18next";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  getPageNumbers: () => (number | string)[];
}

export function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  getPageNumbers,
}: PaginationProps) {
  const { t } = useTranslation();
  return (
    <nav
      className="mt-8 flex flex-col items-center gap-2"
      aria-label="Pagination"
    >
      <div className="flex items-center gap-1">
        {/* Previous */}
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border transition-all disabled:opacity-40"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
            color: "var(--sidebar-muted)",
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1)
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--primary) 8%, transparent)";
          }}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === PAGINATION_ELLIPSIS ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm"
              style={{ color: "var(--sidebar-muted)" }}
            >
              ···
            </span>
          ) : (
            <Button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all"
              style={
                currentPage === page
                  ? {
                      background: "var(--primary)",
                      borderColor: "var(--primary)",
                      color: "#fff",
                    }
                  : {
                      background: "transparent",
                      borderColor:
                        "color-mix(in srgb, var(--primary) 15%, transparent)",
                      color: "var(--sidebar-muted)",
                    }
              }
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.background =
                    "color-mix(in srgb, var(--primary) 8%, transparent)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--sidebar-muted)";
                }
              }}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          ),
        )}

        {/* Next */}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border transition-all disabled:opacity-40"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
            color: "var(--sidebar-muted)",
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages)
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--primary) 8%, transparent)";
          }}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs" style={{ color: "var(--sidebar-muted)" }}>
        {t("pagination.page") + " "} {currentPage} {" " + t("pagination.of")}{" "}
        {totalPages}
      </p>
    </nav>
  );
}
