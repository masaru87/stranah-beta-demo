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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Secret } from "@/types";

const mockSecrets: Secret[] = [
  { key: "SAKURA_ACCESS_TOKEN", maskedValue: "••••••••••••a1b2", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "SAKURA_ACCESS_SECRET", maskedValue: "••••••••••••c3d4", updatedAt: "2026-03-28T10:00:00Z" },
  { key: "DB_PASSWORD", maskedValue: "••••••••••••e5f6", updatedAt: "2026-03-25T14:00:00Z" },
  { key: "SSL_CERTIFICATE", maskedValue: "••••••••••••g7h8", updatedAt: "2026-03-20T09:00:00Z" },
];

export default function SecretsPage() {
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
            <h1 className="text-2xl font-bold">Secrets</h1>
            <p className="text-sm text-muted-foreground">
              機密情報は暗号化して保存されます
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("新しい行を追加しました")}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            追加
          </Button>
          <Button size="sm" onClick={() => toast.success("Secretsを保存しました")}>
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
          {mockSecrets.map((s) => (
            <TableRow key={s.key}>
              <TableCell>
                <code className="text-sm">{s.key}</code>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">
                    {s.maskedValue}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    暗号化済み
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(s.updatedAt).toLocaleDateString("ja-JP")}
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
