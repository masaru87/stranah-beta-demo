import type { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "deploy_success",
    title: "デプロイ完了",
    message: "住民サービスポータル / 開発環境のデプロイが成功しました",
    read: false,
    createdAt: "2026-03-28T10:30:00Z",
    linkTo: "/env/env-1/deploy/deploy-1",
  },
  {
    id: "notif-2",
    type: "deploy_failed",
    title: "デプロイ失敗",
    message: "住民サービスポータル / 開発環境のデプロイが失敗しました",
    read: false,
    createdAt: "2026-03-24T11:03:00Z",
    linkTo: "/env/env-1/deploy/deploy-3",
  },
  {
    id: "notif-3",
    type: "drift_detected",
    title: "構成差分を検知",
    message: "ステージング環境で2件のドリフトが検出されました",
    read: true,
    createdAt: "2026-03-23T08:00:00Z",
    linkTo: "/env/env-2/drift",
  },
  {
    id: "notif-4",
    type: "member_invited",
    title: "メンバー招待",
    message: "佐藤 健太さんがワークスペースに招待されました",
    read: true,
    createdAt: "2026-03-25T14:00:00Z",
  },
  {
    id: "notif-5",
    type: "environment_created",
    title: "環境作成",
    message: "内部業務システム / 本番環境が作成されました",
    read: true,
    createdAt: "2026-03-22T09:00:00Z",
    linkTo: "/env/env-5",
  },
];

export function getUnreadCount(): number {
  return mockNotifications.filter((n) => !n.read).length;
}
