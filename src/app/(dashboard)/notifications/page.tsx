"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserPlus,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { mockNotifications } from "@/data/mock-notifications";
import type { Notification, NotificationType } from "@/types";

const typeIcons: Record<NotificationType, React.ReactNode> = {
  deploy_success: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />,
  deploy_failed: <XCircle className="h-3.5 w-3.5 text-red-600" />,
  drift_detected: <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />,
  member_invited: <UserPlus className="h-3.5 w-3.5 text-blue-600" />,
  environment_created: <Server className="h-3.5 w-3.5 text-blue-600" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("すべて既読にしました");
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/workspace">
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">通知</h1>
            <p className="text-sm text-muted-foreground">
              システムからのお知らせ
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          すべて既読にする
        </Button>
      </div>

      <div className="rounded-lg border">
        {notifications.map((notif, i) => {
          const Wrapper = notif.linkTo ? Link : "div";
          const wrapperProps = notif.linkTo ? { href: notif.linkTo } : {};
          return (
            <Wrapper
              key={notif.id}
              {...(wrapperProps as Record<string, string>)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/50",
                !notif.read && "bg-primary/5",
                i > 0 && "border-t"
              )}
            >
              <div className="shrink-0">{typeIcons[notif.type]}</div>
              {!notif.read && (
                <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              )}
              <span className={cn("text-sm truncate", !notif.read && "font-medium")}>
                {notif.title}
              </span>
              <span className="text-sm text-muted-foreground truncate flex-1">
                {notif.message}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {new Date(notif.createdAt).toLocaleDateString("ja-JP", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
