import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthService from "../features/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../shared/constants/appConstants";

const AuthLayout = () => {
    const { t } = useTranslation();
    const authService = AuthService();
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = authService.login(phone, password);
            if (!success) {
                setError(t("auth.invalid_credentials"));
            } else {
                setError(null);
                navigate(ROUTES.DASHBOARD);
            }
        } catch (err) {
            setError(t("auth.login_error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0c0720",
                backgroundImage: `repeating-linear-gradient(
                    135deg,
                    rgba(255,255,255,0.018) 0px,
                    rgba(255,255,255,0.018) 1px,
                    transparent 1px,
                    transparent 12px
                )`,
                padding: "24px 16px",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}
        >
            {/* Glow: góc trên trái — nhỏ, mờ, xa */}
            <div aria-hidden="true" style={{
                position: "absolute",
                top: "-200px", left: "-160px",
                width: "560px", height: "560px",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "radial-gradient(circle at 40% 40%, rgba(109,40,217,0.18) 0%, transparent 60%)",
                filter: "blur(40px)",
            }} />

            {/* Glow: góc dưới phải — cùng tone, nhẹ hơn */}
            <div aria-hidden="true" style={{
                position: "absolute",
                bottom: "-180px", right: "-180px",
                width: "500px", height: "500px",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "radial-gradient(circle at 60% 60%, rgba(91,33,182,0.14) 0%, transparent 60%)",
                filter: "blur(50px)",
            }} />

            {/* Glow: giữa màn hình — rất nhẹ, chỉ tạo depth */}
            <div aria-hidden="true" style={{
                position: "absolute",
                top: "30%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px", height: "300px",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 65%)",
                filter: "blur(60px)",
            }} />

            {/* Card */}
            <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "400px" }}>
                <div style={{
                    backgroundColor: "#1a0e42",
                    border: "1px solid rgba(139,92,246,0.22)",
                    borderRadius: "20px",
                    padding: "40px 36px",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,58,237,0.06) inset",
                    boxSizing: "border-box",
                }}>

                    {/* Logo */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
                        <div style={{
                            width: "56px", height: "56px", borderRadius: "16px",
                            background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: "14px",
                            boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                        }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"
                                strokeLinecap="round" strokeLinejoin="round" style={{ width: "28px", height: "28px" }}>
                                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                <polyline points="14 17.5 16.5 20 20 15" />
                            </svg>
                        </div>
                        <h1 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>
                            HabitPro
                        </h1>
                        <p style={{ color: "rgba(196,181,253,0.5)", fontSize: "0.875rem", marginTop: "6px", marginBottom: 0 }}>
                            {t("auth.welcome")} 👋
                        </p>
                    </div>
                    <span style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "12px", display: "block", textAlign: "center" }}>
                        {error}
                    </span>
                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" style={{
                                display: "block", marginBottom: "8px",
                                color: "rgba(196,181,253,0.45)", fontSize: "0.68rem",
                                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                            }}>
                                {t("auth.phone")}
                            </label>
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute", left: "14px", top: "50%",
                                    transform: "translateY(-50%)", color: "rgba(167,139,250,0.4)",
                                    display: "flex", pointerEvents: "none",
                                }}>
                                    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "16px", height: "16px" }}>
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </span>
                                <input
                                    id="phone" type="tel" inputMode="numeric"
                                    placeholder="0912 345 678"
                                    value={phone} onChange={(e) => setPhone(e.target.value)} required
                                    style={{
                                        width: "100%", boxSizing: "border-box",
                                        paddingLeft: "42px", paddingRight: "16px",
                                        paddingTop: "13px", paddingBottom: "13px",
                                        borderRadius: "12px", outline: "none",
                                        backgroundColor: "rgba(255,255,255,0.045)",
                                        border: "1px solid rgba(139,92,246,0.18)",
                                        color: "#ffffff", fontSize: "0.9rem",
                                        transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.075)";
                                        e.currentTarget.style.borderColor = "rgba(139,92,246,0.55)";
                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.045)";
                                        e.currentTarget.style.borderColor = "rgba(139,92,246,0.18)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" style={{
                                display: "block", marginBottom: "8px",
                                color: "rgba(196,181,253,0.45)", fontSize: "0.68rem",
                                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                            }}>
                                {t("auth.password")}
                            </label>
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute", left: "14px", top: "50%",
                                    transform: "translateY(-50%)", color: "rgba(167,139,250,0.4)",
                                    display: "flex", pointerEvents: "none",
                                }}>
                                    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "16px", height: "16px" }}>
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                    style={{
                                        width: "100%", boxSizing: "border-box",
                                        paddingLeft: "42px", paddingRight: "48px",
                                        paddingTop: "13px", paddingBottom: "13px",
                                        borderRadius: "12px", outline: "none",
                                        backgroundColor: "rgba(255,255,255,0.045)",
                                        border: "1px solid rgba(139,92,246,0.18)",
                                        color: "#ffffff", fontSize: "0.9rem",
                                        transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.075)";
                                        e.currentTarget.style.borderColor = "rgba(139,92,246,0.55)";
                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.045)";
                                        e.currentTarget.style.borderColor = "rgba(139,92,246,0.18)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    onClick={() => setShowPassword((v) => !v)}
                                    style={{
                                        position: "absolute", right: "14px", top: "50%",
                                        transform: "translateY(-50%)", background: "none",
                                        border: "none", cursor: "pointer",
                                        color: "rgba(167,139,250,0.45)", padding: 0, display: "flex",
                                    }}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "16px", height: "16px" }}>
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "16px", height: "16px" }}>
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div style={{ textAlign: "right", marginTop: "8px" }}>
                                <button type="button" style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    color: "rgba(167,139,250,0.5)", fontSize: "0.75rem", padding: 0,
                                }}>
                                    Quên mật khẩu?
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit" disabled={loading}
                            style={{
                                width: "100%", padding: "14px",
                                borderRadius: "12px", border: "none",
                                background: loading
                                    ? "rgba(109,40,217,0.45)"
                                    : "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                                color: "#ffffff", fontSize: "0.95rem", fontWeight: 700,
                                letterSpacing: "0.02em",
                                cursor: loading ? "not-allowed" : "pointer",
                                boxShadow: loading ? "none" : "0 4px 18px rgba(124,58,237,0.38)",
                                marginTop: "4px",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                transition: "opacity 0.2s, box-shadow 0.2s",
                            }}
                        >
                            {loading ? (
                                <>
                                    <svg style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }}
                                        fill="none" viewBox="0 0 24 24">
                                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4" />
                                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    {t("loading.message")}
                                </>
                            ) : t("auth.login")}
                        </button>
                    </form>
                </div>

                <p style={{
                    textAlign: "center", marginTop: "20px",
                    color: "rgba(139,92,246,0.2)", fontSize: "0.65rem",
                }}>
                    {t("common.copyright")}
                </p>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                input::placeholder { color: rgba(167,139,250,0.28); }
                button:hover { opacity: 0.88; }
                * { box-sizing: border-box; }
            `}</style>
        </div>
    );
};

export default AuthLayout;