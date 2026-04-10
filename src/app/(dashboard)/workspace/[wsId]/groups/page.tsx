"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ChevronLeft, Shield, Plus } from "lucide-react";
import { toast } from "sonner";

type PermissionGroup = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: {
    envOperation: boolean;
    deploy: boolean;
    memberMgmt: boolean;
    settings: boolean;
    viewCost: boolean;
  };
};

const mockGroups: PermissionGroup[] = [
  {
    id: "g-admin",
    name: "管理者",
    description: "すべての操作が可能",
    memberCount: 2,
    permissions: {
      envOperation: true,
      deploy: true,
      memberMgmt: true,
      settings: true,
      viewCost: true,
    },
  },
  {
    id: "g-member",
    name: "メンバー",
    description: "環境操作・デプロイが可能",
    memberCount: 5,
    permissions: {
      envOperation: true,
      deploy: true,
      memberMgmt: false,
      settings: false,
      viewCost: true,
    },
  },
  {
    id: "g-viewer",
    name: "閲覧のみ",
    description: "環境の閲覧のみ可能",
    memberCount: 3,
    permissions: {
      envOperation: false,
      deploy: false,
      memberMgmt: false,
      settings: false,
      viewCost: false,
    },
  },
  {
    id: "g-billing",
    name: "請求情報閲覧",
    description: "コスト情報のみ閲覧可能（経理担当者向け）",
    memberCount: 2,
    permissions: {
      envOperation: false,
      deploy: false,
      memberMgmt: false,
      settings: false,
      viewCost: true,
    },
  },
];

export default function GroupsPage() {
  const params = useParams();
  const wsId = params.wsId as string;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/workspace/${wsId}`}>
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">グループ権限</h1>
            <p className="text-sm text-muted-foreground">
              権限グループを作成し、メンバーに割り当てます
            </p>
          </div>
        </div>
        <Button size="sm" onClick={() => toast.info("カスタムグループの作成はPhase2で対応予定です")}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          グループ作成
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="h-4 w-4" />
                    {group.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {group.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {group.memberCount} 名
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {[
                  { key: "envOperation", label: "環境操作" },
                  { key: "deploy", label: "デプロイ実行" },
                  { key: "memberMgmt", label: "メンバー管理" },
                  { key: "settings", label: "設定変更" },
                  { key: "viewCost", label: "コスト閲覧" },
                ].map(({ key, label }) => {
                  const allowed = group.permissions[key as keyof typeof group.permissions];
                  return (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <Badge
                        variant="secondary"
                        className={allowed
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-[10px]"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px]"
                        }
                      >
                        {allowed ? "許可" : "不可"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">権限マトリクス</CardTitle>
          <CardDescription>全グループの権限一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>グループ</TableHead>
                <TableHead className="text-center">環境操作</TableHead>
                <TableHead className="text-center">デプロイ</TableHead>
                <TableHead className="text-center">メンバー管理</TableHead>
                <TableHead className="text-center">設定変更</TableHead>
                <TableHead className="text-center">コスト閲覧</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium text-sm">{group.name}</TableCell>
                  {(["envOperation", "deploy", "memberMgmt", "settings", "viewCost"] as const).map((key) => (
                    <TableCell key={key} className="text-center">
                      {group.permissions[key] ? (
                        <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
