import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FolderKanban } from "lucide-react";
import type { Workspace } from "@/types";

// デモ用モックデータ
const workspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "東京都 情報システム部",
    memberCount: 12,
    projectCount: 3,
    updatedAt: "2026-03-28T10:00:00Z",
  },
  {
    id: "ws-2",
    name: "大阪府 デジタル推進課",
    memberCount: 8,
    projectCount: 2,
    updatedAt: "2026-03-27T15:30:00Z",
  },
  {
    id: "ws-3",
    name: "開発チーム",
    memberCount: 5,
    projectCount: 1,
    updatedAt: "2026-03-25T09:00:00Z",
  },
];

export default function WorkspacePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ワークスペース</h1>
          <p className="text-muted-foreground">
            所属するワークスペースを選択してください
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((ws) => (
          <Link key={ws.id} href={`/workspace/${ws.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{ws.name}</CardTitle>
                <CardDescription>
                  最終更新: {new Date(ws.updatedAt).toLocaleDateString("ja-JP")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {ws.memberCount} メンバー
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <FolderKanban className="h-3 w-3" />
                    {ws.projectCount} プロジェクト
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
