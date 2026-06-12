import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  size = "md",
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const widths = { sm: 400, md: 540, lg: 680 };

  return (
    <div
      style={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{ ...styles.modal, maxWidth: widths[size] }}>
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button
            style={styles.closeBtn}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--primary) 10%, transparent)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--sidebar-muted)";
            }}
          >
            <X size={18} />
          </button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(8,8,9,0.6)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "var(--surface)",
    border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
    borderRadius: "16px",
    overflow: "hidden", // ✅ thêm dòng này — clip mọi thứ theo border-radius
    width: "100%",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 50px -10px rgba(0,0,0,0.25)",
    animation: "scaleIn 0.25s cubic-bezier(0.4,0,0.2,1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 28px 20px",
    borderBottom:
      "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
    flexShrink: 0,
  },
  body: {
    padding: "24px 28px 28px",
    overflowY: "auto", // chỉ phần này cuộn
    minHeight: 0, // cần thiết khi dùng flex column + overflow
  },
  title: {
    fontSize: "22px",
    fontWeight: 500,
    color: "var(--text)",
    letterSpacing: "0.02em",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--sidebar-muted)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
};
