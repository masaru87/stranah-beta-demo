"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import type { Variable } from "@/types";

const mockVariables: Variable[] = [
  { key: "SERVER_CORE", value: "2", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "SERVER_MEMORY", value: "4", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "DB_ENGINE", value: "postgresql", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "DB_STORAGE_SIZE", value: "500", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "LB_PLAN", value: "highspec", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "DOMAIN", value: "portal.tokyo.lg.jp", updatedAt: "2026-03-25T14:00:00Z" },
];

export default function VariablesPage() {
  const params = useParams();
  const envId = params.envId as string;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/env/${envId}/settings`}>
            <Button variant="ghost" size="icon-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Variables</h1>
            <p className="text-sm text-muted-foreground">
              環境で使用する設定値を管理
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("新しい行を追加しました")}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            追加
          </Button>
          <Button size="sm" onClick={() => toast.success("Variablesを保存しました")}>
            <Save className="mr-1.5 h-3.5 w-3.5" />
            保存
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>キー</TableHead>
            <TableHead>値</TableHead>
            <TableHead>更新日</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockVariables.map((v) => (
            <TableRow key={v.key}>
              <TableCell>
                <Input defaultValue={v.key} className="font-mono text-sm h-8" />
              </TableCell>
              <TableCell>
                <Input defaultValue={v.value} className="text-sm h-8" />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(v.updatedAt).toLocaleDateString("ja-JP")}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon-xs">
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
