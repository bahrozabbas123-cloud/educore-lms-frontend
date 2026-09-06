"use client";

import Link from "next/link";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { AuthContext } from "@/components/shared/AuthProvider";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/components/shared/ThemeProvider";

type NotificationSettings = { announcements: boolean; assignmentReminders: boolean; weeklyDigest: boolean };
const defaultNotifications: NotificationSettings = { announcements: true, assignmentReminders: true, weeklyDigest: false };
type IconName = "sun" | "bell" | "shield" | "user" | "sliders" | "log-out";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    shield: <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z" />,
    user: <><circle cx="12" cy="8" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="8" cy="6" r="2" /><circle cx="16" cy="12" r="2" /><circle cx="10" cy="18" r="2" /></>,
    "log-out": <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M21 19V5a2 2 0 0 0-2-2h-5" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">{paths[name]}</svg>;
}

function SectionHeading({ icon, eyebrow, title, description }: { icon: IconName; eyebrow: string; title: string; description: string }) {
  return <CardHeader className="flex items-start gap-3 sm:flex-row"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-violet/15 text-brand-violetLight"><Icon name={icon} /></span><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">{eyebrow}</p><CardTitle className="mt-1">{title}</CardTitle><CardDescription>{description}</CardDescription></div></CardHeader>;
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-6 w-11 shrink-0 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-violetLight/50 ${checked ? "bg-brand-cyan" : "bg-white/15"}`}><span className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} /></button>;
}

function PreferenceRow({ label, description, children }: { label: string; description: string; children: ReactNode }) {
  return <div className="flex items-center justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"><div className="min-w-0"><p className="font-medium text-foreground">{label}</p><p className="mt-1 text-sm text-foreground/50">{description}</p></div>{children}</div>;
}

export default function SettingsPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [language, setLanguage] = useState("English");
  const [density, setDensity] = useState("comfortable");

  useEffect(() => {
    const savedNotifications = localStorage.getItem("educore-notification-settings");
    const savedLanguage = localStorage.getItem("educore-language");
    const savedDensity = localStorage.getItem("educore-density");
    if (savedNotifications) setNotifications({ ...defaultNotifications, ...JSON.parse(savedNotifications) });
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedDensity) setDensity(savedDensity);
  }, []);

  function updateNotifications(key: keyof NotificationSettings) {
    setNotifications((current) => {
      const next = { ...current, [key]: !current[key] };
      localStorage.setItem("educore-notification-settings", JSON.stringify(next));
      return next;
    });
  }

  function handleLogout() {
    auth?.logout();
    router.push("/login");
  }

  const initials = auth?.user?.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "EC";
  const themes: Array<{ value: Theme; label: string; detail: string }> = [
    { value: "light", label: "Light", detail: "Bright workspace" },
    { value: "dark", label: "Dark", detail: "Low-light workspace" },
    { value: "system", label: "System", detail: `Currently ${resolvedTheme}` },
  ];

  return <ProtectedRoute><div className="mx-auto flex max-w-5xl flex-col gap-6 pb-8">
    <div className="page-enter"><p className="text-sm font-medium text-brand-cyan">Workspace control</p><h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Settings</h1><p className="mt-2 max-w-2xl text-sm text-foreground/60">Tune your EduCore workspace, notifications, and account preferences.</p></div>

    <Card className="page-enter overflow-hidden"><SectionHeading icon="sun" eyebrow="Appearance" title="Make it yours" description="Choose the visual mode that feels right for your study session." /><div className="grid gap-3 sm:grid-cols-3">{themes.map((option) => <button key={option.value} type="button" onClick={() => setTheme(option.value)} aria-pressed={theme === option.value} className={`rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-violetLight/50 ${theme === option.value ? "border-brand-cyan bg-brand-cyan/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}><span className="flex items-center justify-between"><span className="font-medium text-foreground">{option.label}</span><span className={`h-2.5 w-2.5 rounded-full ${theme === option.value ? "bg-brand-cyan" : "bg-white/20"}`} /></span><span className="mt-1 block text-xs capitalize text-foreground/50">{option.detail}</span></button>)}</div></Card>

    <Card><SectionHeading icon="bell" eyebrow="Notifications" title="Stay in the loop" description="These preferences are saved on this device. Your notification center remains the source of truth for unread activity." /><div className="flex flex-col gap-3"><PreferenceRow label="Announcements" description="Updates from your learning team"><Toggle label="Announcements" checked={notifications.announcements} onChange={() => updateNotifications("announcements")} /></PreferenceRow><PreferenceRow label="Assignment reminders" description="Keep upcoming work visible"><Toggle label="Assignment reminders" checked={notifications.assignmentReminders} onChange={() => updateNotifications("assignmentReminders")} /></PreferenceRow><PreferenceRow label="Weekly learning digest" description="A quick summary of your progress"><Toggle label="Weekly learning digest" checked={notifications.weeklyDigest} onChange={() => updateNotifications("weeklyDigest")} /></PreferenceRow></div></Card>

    <Card><SectionHeading icon="shield" eyebrow="Security" title="Protect your session" description="Your EduCore session is secured by the backend authentication service." /><div className="flex flex-col gap-3"><PreferenceRow label="Current session" description="This device is signed in as your current account"><Badge variant="success">Active</Badge></PreferenceRow><PreferenceRow label="Password" description="Password changes are managed through the account service"><span className="text-xs text-foreground/40">Managed securely</span></PreferenceRow></div></Card>

    <div className="grid gap-6 lg:grid-cols-2"><Card><SectionHeading icon="user" eyebrow="Profile" title="Your account" description="Review the details used across your EduCore workspace." /><div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet to-brand-cyan font-heading text-lg font-bold text-white">{initials}</div><div className="min-w-0"><p className="truncate font-medium text-foreground">{auth?.user?.fullName}</p><p className="truncate text-sm text-foreground/50">{auth?.user?.email}</p><span className="mt-2 inline-flex items-center rounded-full bg-brand-cyan/15 px-2.5 py-1 text-xs font-medium capitalize text-brand-cyan">{auth?.user?.role.replace("_", " ")}</span></div></div><Link href="/dashboard/profile" className="mt-4 inline-flex text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violetLight">Edit profile <span aria-hidden="true" className="ml-1">-&gt;</span></Link></Card>

    <Card><SectionHeading icon="sliders" eyebrow="Preferences" title="Your workspace" description="Keep the interface comfortable for your daily workflow." /><div className="flex flex-col gap-3"><label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm"><span><span className="block font-medium text-foreground">Language</span><span className="mt-1 block text-xs text-foreground/50">Interface language</span></span><select value={language} onChange={(event) => { setLanguage(event.target.value); localStorage.setItem("educore-language", event.target.value); }} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-foreground outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20"><option>English</option></select></label><label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm"><span><span className="block font-medium text-foreground">Interface density</span><span className="mt-1 block text-xs text-foreground/50">Spacing preference for dashboards</span></span><select value={density} onChange={(event) => { setDensity(event.target.value); localStorage.setItem("educore-density", event.target.value); }} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-foreground outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20"><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label></div></Card></div>

    <Card><SectionHeading icon="log-out" eyebrow="Account" title="Account actions" description="Manage your current session on this device." /><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div><p className="font-medium text-foreground">Sign out of EduCore</p><p className="mt-1 text-sm text-foreground/50">You can sign back in at any time with your account credentials.</p></div><Button variant="outline" onClick={handleLogout}><Icon name="log-out" />Log out</Button></div></Card>
  </div></ProtectedRoute>;
}