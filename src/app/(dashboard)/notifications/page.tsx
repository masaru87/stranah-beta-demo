"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserPlus,
  Server,
} from "lucide-react";
import { toast } from "sonner";
import { mockNotifications } from "@/data/mock-notifications";
import type { Notification, NotificationType } from "@/types";

const typeIcons: Record<NotificationType, React.ReactNode> = {
  deploy_success: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  deploy_failed: <XCircle className="h-4 w-4 text-red-600" />,
  drift_detected: <AlertTriangle className="h-4 w-4 text-amber-600" />,
  member_invited: <UserPlus className="h-4 w-4 text-blue-600" />,
  environment_created: <Server className="h-4 w-4 text-blue-600" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("すべて既読にしました");
  }

  return (
    <div className="space-y-6 p-6">
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

      <div className="space-y-2">
        {notifications.map((notif) => {
          const inner = (
            <Card
              className={`transition-colors hover:bg-muted/50 ${
                !notif.read ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              <CardContent className="flex items-start gap-3 p-4">
                <div className="mt-0.5">{typeIcons[notif.type]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{notif.title}</p>
                    {!notif.read && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary text-[10px] px-1.5"
                      >
                        未読
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notif.message}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(notif.createdAt).toLocaleString("ja-JP")}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
          return notif.linkTo ? (
            <Link key={notif.id} href={notif.linkTo}>
              {inner}
            </Link>
          ) : (
            <div key={notif.id}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
