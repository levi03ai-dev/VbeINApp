import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Check,
  Music,
  Sliders,
  Database,
  Bell,
  Trash2,
  Activity,
  Sparkles,
  Moon,
} from "lucide-react";
import { toast } from "sonner";
import { themes, applyTheme } from "@/lib/utils";
import { usePlayer } from "@/lib/player-context";

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — Sonora" },
      { name: "description", content: "Manage your music profile and custom playback settings." },
    ],
  }),
  component: ProfileAndSettings,
});

// Gradient avatar presets
const AVATAR_GRADIENTS = [
  { id: "grad-1", label: "Sunset Glow", class: "from-pink-500 to-orange-400" },
  { id: "grad-2", label: "Neon Cyber", class: "from-purple-600 to-cyan-400" },
  { id: "grad-3", label: "Ocean Breeze", class: "from-blue-600 to-teal-400" },
  { id: "grad-4", label: "Forest Moss", class: "from-emerald-500 to-teal-600" },
  { id: "grad-5", label: "Solar Flare", class: "from-yellow-400 to-orange-500" },
  { id: "grad-6", label: "Amethyst Dream", class: "from-indigo-500 to-purple-600" },
];

const GENRES = ["Indie Pop", "Lo-Fi", "Electronic", "Classical", "Synthwave", "Hip Hop", "Jazz"];

const QUALITY_OPTIONS = [
  { value: "low", label: "96k", desc: "Data Saver" },
  { value: "normal", label: "160k", desc: "Standard" },
  { value: "high", label: "320k", desc: "High Quality" },
  { value: "lossless", label: "Hi-Res", desc: "Lossless FLAC" },
];

const EQ_PRESETS = [
  { id: "flat", label: "Flat", desc: "Neutral soundstage", values: [40, 40, 40, 40, 40] },
  { id: "bass", label: "Bass Booster", desc: "Thumping sub-bass", values: [85, 75, 45, 40, 35] },
  {
    id: "vocal",
    label: "Vocal Clarity",
    desc: "Crisp mids & speech",
    values: [30, 45, 75, 70, 50],
  },
  { id: "acoustic", label: "Acoustic", desc: "Warm live acoustic", values: [60, 50, 45, 60, 65] },
  {
    id: "electronic",
    label: "Electronic",
    desc: "Vibrant club style",
    values: [75, 55, 35, 65, 80],
  },
];

function ProfileAndSettings() {
  const {
    sleepTimerRemaining,
    setSleepTimer,
    likedTracks,
    recentlyPlayed,
    listeningTimeSeconds,
    totalTracksPlayed,
  } = usePlayer();
  // Profile Info
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("biyesh369@gmail.com");
  const [favGenre, setFavGenre] = useState("Indie Pop");
  const [avatarColor, setAvatarColor] = useState("from-pink-500 to-orange-400");
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);

  // Settings Toggles
  const [cellularStreaming, setCellularStreaming] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Sound settings
  const [audioQuality, setAudioQuality] = useState("high");
  const [eqPreset, setEqPreset] = useState("flat");

  // Cache settings
  const [cacheSize, setCacheSize] = useState(142.4);
  const [isClearing, setIsClearing] = useState(false);

  // Theme settings
  const [activeTheme, setActiveTheme] = useState("midnight");

  // Initial load
  useEffect(() => {
    // Profile
    const savedProfile = localStorage.getItem("melody-stream-profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.favGenre) setFavGenre(parsed.favGenre);
        if (parsed.avatarColor) setAvatarColor(parsed.avatarColor);
      } catch (e) {
        console.error("Error loading profile:", e);
      }
    }

    // Settings
    const savedQuality = localStorage.getItem("melody-stream-quality");
    if (savedQuality) setAudioQuality(savedQuality);

    const savedEq = localStorage.getItem("melody-stream-eq");
    if (savedEq) setEqPreset(savedEq);

    const savedTheme = localStorage.getItem("melody-stream-theme");
    if (savedTheme) setActiveTheme(savedTheme);

    const savedCellular = localStorage.getItem("melody-stream-cellular");
    if (savedCellular) setCellularStreaming(savedCellular === "true");

    const savedAutoplay = localStorage.getItem("melody-stream-autoplay");
    if (savedAutoplay) setAutoplayNext(savedAutoplay === "true");

    const savedNotifications = localStorage.getItem("melody-stream-notifications");
    if (savedNotifications) setPushNotifications(savedNotifications === "true");

    const savedCache = localStorage.getItem("melody-stream-cache-size");
    if (savedCache) setCacheSize(parseFloat(savedCache));
  }, []);

  // Sync profile edits back to local storage and dispatch event
  const saveProfileValue = (updatedFields: Record<string, string | number | boolean>) => {
    const current = { name, email, favGenre, avatarColor, ...updatedFields };
    localStorage.setItem("melody-stream-profile", JSON.stringify(current));
    window.dispatchEvent(new Event("profile-updated"));
  };

  const handleNameChange = (val: string) => {
    setName(val);
    saveProfileValue({ name: val });
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    saveProfileValue({ email: val });
  };

  const handleFavGenreChange = (val: string) => {
    setFavGenre(val);
    saveProfileValue({ favGenre: val });
    toast.success(`Favorite genre updated to ${val}`);
  };

  const handleAvatarChange = (gradClass: string) => {
    setAvatarColor(gradClass);
    saveProfileValue({ avatarColor: gradClass });
    toast.success("Avatar style updated!");
    setShowAvatarEdit(false);
  };

  const handleQualityChange = (val: string) => {
    setAudioQuality(val);
    localStorage.setItem("melody-stream-quality", val);
    const label = QUALITY_OPTIONS.find((q) => q.value === val)?.label;
    toast.success(`Streaming quality set to ${label}`);
  };

  const handleEqPresetChange = (val: string) => {
    setEqPreset(val);
    localStorage.setItem("melody-stream-eq", val);
    const label = EQ_PRESETS.find((e) => e.id === val)?.label;
    toast.success(`Equalizer preset changed to ${label}`);
  };

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem("melody-stream-theme", themeId);
    applyTheme(themeId);
    const themeName = themes.find((t) => t.id === themeId)?.name;
    toast.success(`Theme switched to ${themeName}`);
  };

  const handleCellularToggle = () => {
    const next = !cellularStreaming;
    setCellularStreaming(next);
    localStorage.setItem("melody-stream-cellular", String(next));
    toast.success(next ? "Streaming over cellular enabled" : "Streaming restricted to Wi-Fi");
  };

  const handleAutoplayToggle = () => {
    const next = !autoplayNext;
    setAutoplayNext(next);
    localStorage.setItem("melody-stream-autoplay", String(next));
    toast.success(next ? "Autoplay tracks turned on" : "Autoplay tracks disabled");
  };

  const handleNotificationsToggle = () => {
    const next = !pushNotifications;
    setPushNotifications(next);
    localStorage.setItem("melody-stream-notifications", String(next));
    toast.success(next ? "Push notifications active" : "Push notifications muted");
  };

  const handleClearCache = () => {
    setIsClearing(true);
    setTimeout(() => {
      setCacheSize(0);
      localStorage.setItem("melody-stream-cache-size", "0");
      setIsClearing(false);
      toast.success("Offline storage cache cleared successfully");
    }, 1100);
  };

  // Find active EQ preset config for drawing visualizers
  const currentEqPresetObj = EQ_PRESETS.find((e) => e.id === eqPreset) ?? EQ_PRESETS[0];

  return (
    <div className="pt-3 pb-8">
      {/* Header with back button */}
      <div className="mb-6 flex items-center gap-3 px-4 pt-4">
        <Link
          to="/"
          className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-surface border border-border text-foreground transition-transform active:scale-90 hover:bg-foreground/5"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </Link>
        <h1 className="text-[20px] font-semibold tracking-tight text-foreground/90">
          Profile & Settings
        </h1>
      </div>

      {/* Profile Section */}
      <section className="px-4 mb-8">
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface/25 p-5 text-center">
          {/* Avatar circle */}
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAvatarEdit(!showAvatarEdit)}
              className={`grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-gradient-to-br ${avatarColor} text-2xl font-black text-white shadow-md`}
            >
              {name.trim().charAt(0).toUpperCase() || "A"}
            </motion.div>
            <button
              onClick={() => setShowAvatarEdit(!showAvatarEdit)}
              className="absolute -bottom-0.5 -right-0.5 rounded-full bg-foreground text-background p-1 shadow-sm hover:opacity-90 transition-opacity"
            >
              <Sparkles className="h-2.5 w-2.5" />
            </button>
          </div>

          {/* Edit avatar panel */}
          <AnimatePresence>
            {showAvatarEdit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 w-full overflow-hidden"
              >
                <div className="rounded-xl border border-border bg-surface/40 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2">
                    Choose Avatar Gradient
                  </p>
                  <div className="grid grid-cols-6 gap-2">
                    {AVATAR_GRADIENTS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => handleAvatarChange(g.class)}
                        className={`h-7 w-7 rounded-full bg-gradient-to-br ${g.class} border-2 ${
                          avatarColor === g.class
                            ? "border-foreground scale-110 shadow-sm"
                            : "border-transparent"
                        } transition-transform active:scale-95`}
                        title={g.label}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Inputs for Profile */}
          <div className="mt-5 w-full space-y-3 text-left">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface/30 px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:border-accent/40 focus:outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface/30 px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:border-accent/40 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50">
                Favorite Music Genre
              </label>
              <div className="relative mt-1">
                <select
                  value={favGenre}
                  onChange={(e) => handleFavGenreChange(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-border bg-surface/30 px-3 py-2 text-[13px] text-foreground focus:border-accent/40 focus:outline-none"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g} className="bg-surface text-foreground">
                      {g}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-muted-foreground/60 text-[9px]">
                  ▼
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listening Stats */}
      <section className="px-4 mb-8">
        <div className="mb-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block">
            Real-Time Analytics
          </span>
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground/90">
            App Activity
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-border bg-surface/25 p-3 text-left">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 truncate">
              Listening Time
            </p>
            <h3 className="mt-1 text-base font-semibold text-foreground">
              {Math.floor(listeningTimeSeconds / 3600)}h{" "}
              {Math.floor((listeningTimeSeconds % 3600) / 60)}m
            </h3>
            <p className="mt-1.5 text-[9px] text-accent/80 font-medium truncate">
              {listeningTimeSeconds}s total
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface/25 p-3 text-left">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 truncate">
              Saved Songs
            </p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{likedTracks.length}</h3>
            <div className="mt-1.5 flex items-center gap-1 text-[9px] text-accent/80 font-medium truncate">
              <Music className="h-2.5 w-2.5 shrink-0" strokeWidth={2} /> Liked
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/25 p-3 text-left">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 truncate">
              Total Plays
            </p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{totalTracksPlayed}</h3>
            <p className="mt-1.5 text-[9px] text-accent/80 font-medium truncate">
              {recentlyPlayed.length} recent
            </p>
          </div>
        </div>
      </section>

      {/* Live Custom Equalizer */}
      <section className="px-4 mb-8">
        <div className="mb-2.5 flex items-end justify-between">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block">
              Soundboard
            </span>
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground/90">
              Equalizer
            </h2>
          </div>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[9px] font-bold text-accent">
            {currentEqPresetObj.label}
          </span>
        </div>

        <div className="rounded-xl border border-border bg-surface/25 p-3.5">
          <div className="mb-4 flex h-14 items-end justify-center gap-1.5 rounded-lg bg-foreground/5 px-3 py-2 border border-border/30">
            {currentEqPresetObj.values.map((v, idx) => {
              const duration = 0.5 + (100 - v) * 0.015;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end">
                  <motion.div
                    animate={{
                      height: [`${v * 0.3}%`, `${v * 0.95}%`, `${v * 0.3}%`],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: duration,
                      ease: "easeInOut",
                      delay: idx * 0.08,
                    }}
                    className="w-full rounded-full bg-accent/80"
                    style={{ maxHeight: "100%" }}
                  />
                  <span className="text-[8px] text-muted-foreground/50 mt-1">
                    {["32Hz", "250Hz", "1kHz", "4kHz", "16kHz"][idx]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-0.5">
            {EQ_PRESETS.map((p) => {
              const active = eqPreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleEqPresetChange(p.id)}
                  className={`flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors ${
                    active ? "bg-accent/5" : "hover:bg-foreground/5"
                  }`}
                >
                  <span
                    className={`text-[12px] font-medium ${active ? "text-accent" : "text-foreground/80"}`}
                  >
                    {p.label}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Streaming Quality */}
      <section className="px-4 mb-8">
        <div className="mb-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block">
            Bandwidth
          </span>
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground/90">
            Audio Quality
          </h2>
        </div>

        <div className="rounded-xl border border-border bg-surface/25 p-1">
          <div className="grid grid-cols-4 gap-1">
            {QUALITY_OPTIONS.map((o) => {
              const active = audioQuality === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => handleQualityChange(o.value)}
                  className={`flex flex-col items-center justify-center rounded-lg py-1.5 px-1 text-center transition-all ${
                    active
                      ? "bg-foreground text-background font-semibold shadow-sm"
                      : "hover:bg-foreground/5 text-foreground/80 font-medium"
                  }`}
                >
                  <span className="text-[11px] tracking-tight">{o.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic App Themes */}
      <section className="px-4 mb-8">
        <div className="mb-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block">
            Visuals
          </span>
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground/90">
            App Themes
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => {
            const active = activeTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`relative flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all ${
                  active
                    ? "border-accent bg-accent/5"
                    : "border-border bg-surface/20 hover:bg-foreground/5"
                }`}
              >
                <div
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border"
                  style={{ backgroundColor: t.background }}
                >
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.accent }} />
                </div>
                <div className="flex-1 overflow-hidden pr-2">
                  <h4 className="text-[11px] font-medium text-foreground truncate tracking-tight">
                    {t.name}
                  </h4>
                </div>
                {active && (
                  <div className="absolute right-2 top-2 rounded-full bg-accent p-0.5 text-white">
                    <Check className="h-2 w-2" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* System Settings & Storage */}
      <section className="px-4 mb-8">
        <div className="mb-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block">
            Operations
          </span>
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground/90">System</h2>
        </div>

        <div className="rounded-xl border border-border bg-surface/25 p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div>
              <h4 className="text-[12px] font-medium text-foreground">Cellular Streaming</h4>
            </div>
            <button
              onClick={handleCellularToggle}
              className={`relative h-4.5 w-8 rounded-full p-0.5 transition-colors duration-300 ${
                cellularStreaming ? "bg-accent" : "bg-foreground/10"
              }`}
            >
              <motion.div
                layout
                className="h-3.5 w-3.5 rounded-full bg-white shadow-sm"
                animate={{ x: cellularStreaming ? 14 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div>
              <h4 className="text-[12px] font-medium text-foreground">Autoplay Next</h4>
            </div>
            <button
              onClick={handleAutoplayToggle}
              className={`relative h-4.5 w-8 rounded-full p-0.5 transition-colors duration-300 ${
                autoplayNext ? "bg-accent" : "bg-foreground/10"
              }`}
            >
              <motion.div
                layout
                className="h-3.5 w-3.5 rounded-full bg-white shadow-sm"
                animate={{ x: autoplayNext ? 14 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div>
              <h4 className="text-[12px] font-medium text-foreground">Push Notifications</h4>
            </div>
            <button
              onClick={handleNotificationsToggle}
              className={`relative h-4.5 w-8 rounded-full p-0.5 transition-colors duration-300 ${
                pushNotifications ? "bg-accent" : "bg-foreground/10"
              }`}
            >
              <motion.div
                layout
                className="h-3.5 w-3.5 rounded-full bg-white shadow-sm"
                animate={{ x: pushNotifications ? 14 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Sleep Timer */}
          <div className="flex flex-col gap-2.5 border-b border-border pb-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[12px] font-medium text-foreground">Sleep Timer</h4>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                  {sleepTimerRemaining !== null ? (
                    <span className="text-accent font-semibold animate-pulse">
                      Active: {formatSeconds(sleepTimerRemaining)} left
                    </span>
                  ) : (
                    "Automatically stop playback after countdown"
                  )}
                </p>
              </div>

              {sleepTimerRemaining !== null && (
                <button
                  onClick={() => setSleepTimer(null)}
                  className="rounded-lg bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 text-[11px] font-semibold text-red-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[5, 15, 30, 45, 60].map((mins) => {
                const isActive =
                  sleepTimerRemaining !== null && Math.ceil(sleepTimerRemaining / 60) === mins;
                return (
                  <button
                    key={mins}
                    onClick={() => setSleepTimer(mins)}
                    className={`rounded-lg px-3 py-1 text-[11px] font-medium border transition-all ${
                      isActive
                        ? "bg-accent/15 border-accent text-accent shadow-sm font-semibold"
                        : "border-border bg-foreground/5 hover:bg-foreground/10 text-foreground/80"
                    }`}
                  >
                    {mins}m
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cache memory clearing option */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <h4 className="text-[12px] font-medium text-foreground">Music Cache</h4>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                Using <span className="text-foreground font-medium">{cacheSize.toFixed(1)} MB</span>
              </p>
            </div>
            <button
              onClick={handleClearCache}
              disabled={isClearing || cacheSize === 0}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground transition active:scale-95 disabled:pointer-events-none disabled:opacity-40 hover:bg-foreground/10"
            >
              {isClearing ? "Clearing..." : "Clear"}
            </button>
          </div>
        </div>
      </section>

      {/* App Info Footer */}
      <section className="px-4 text-center text-muted-foreground/50 mt-12 mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest">Sonora v1.4.2</p>
        <p className="text-[9px] mt-1">Crafted with precision & care</p>
      </section>
    </div>
  );
}
