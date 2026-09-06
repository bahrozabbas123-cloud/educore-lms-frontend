"use client";

import { useEffect, useRef, useState } from "react";
import type { Notification } from "@/types";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/api";

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(value)
  );
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  async function loadNotifications() {
    try {
      setError("");
      setLoading(true);
      setNotifications(await getNotifications());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
    function closeOnOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const unreadCount = notifications.filter((notification) => !notification.is_read).length;

  async function readNotification(notification: Notification) {
    if (notification.is_read) return;
    await markNotificationRead(notification.id);
    setNotifications((current) => current.map((item) =>
      item.id === notification.id ? { ...item, is_read: true } : item
    ));
  }

  async function readAll() {
    await markAllNotificationsRead();
    setNotifications((current) => current.map((notification) => ({ ...notification, is_read: true })));
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground transition hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-violetLight/50"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-cyan px-1 text-[10px] font-bold text-slate-950">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">Notifications</p>
              <p className="text-xs text-foreground/50">{unreadCount} unread</p>
            </div>
            {unreadCount > 0 && (
              <button type="button" onClick={readAll} className="text-xs text-brand-cyan hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {loading && <p className="px-4 py-8 text-center text-sm text-foreground/60">Loading notifications...</p>}
            {!loading && error && <p className="px-4 py-8 text-center text-sm text-red-300">{error}</p>}
            {!loading && !error && notifications.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-foreground/60">You&apos;re all caught up.</p>
            )}
            {!loading && !error && notifications.map((notification) => (
              <button
                type="button"
                key={notification.id}
                onClick={() => readNotification(notification)}
                className={`block w-full border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5 ${notification.is_read ? "opacity-60" : "bg-brand-cyan/[0.06]"}`}
              >
                <div className="flex gap-3">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${notification.is_read ? "bg-white/20" : "bg-brand-cyan"}`} />
                  <div>
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="mt-1 text-xs text-foreground/40">{formatDate(notification.created_at)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
