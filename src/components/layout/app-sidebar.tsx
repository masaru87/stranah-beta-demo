"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Server,
  Layers,
  Users,
  Settings,
  FolderKanban,
  History,
  ListOrdered,
  Code,
  KeyRound,
  Variable,
  ChevronLeft,
  AlertTriangle,
  List,
  Boxes,
  Webhook,
  ScrollText,
} from "lucide-react";

function extractIds(pathname: string) {
  const wsMatch = pathname.match(/\/workspace\/([^/]+)/);
  const pjMatch = pathname.match(/\/project\/([^/]+)/);
  const envMatch = pathname.match(/\/env\/([^/]+)/);
  return {
    wsId: wsMatch?.[1],
    pjId: pjMatch?.[1],
    envId: envMatch?.[1],
  };
}

export function AppSidebar() {
  const pathname = usePathname();
  const { wsId, pjId, envId } = extractIds(pathname);

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/workspace" className="flex items-center gap-2">
            <Server className="h-6 w-6" />
            <span className="text-lg font-bold">Stranah</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* メインナビ - 常に表示 */}
        <SidebarGroup>
          <SidebarGroupLabel>ナビゲーション</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/workspace" || pathname.startsWith("/workspace/")}
                  render={<Link href="/workspace" />}
                >
                  <LayoutDashboard />
                  <span>ワークスペース</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/architectures")}
                  render={<Link href="/architectures" />}
                >
                  <Layers />
                  <span>テンプレート</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ワークスペースコンテキスト */}
        {wsId && (
          <SidebarGroup>
            <SidebarGroupLabel>ワークスペース</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/workspace/${wsId}`}
                    render={<Link href={`/workspace/${wsId}`} />}
                  >
                    <FolderKanban />
                    <span>プロジェクト一覧</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/workspace/${wsId}/member`}
                    render={<Link href={`/workspace/${wsId}/member`} />}
                  >
                    <Users />
                    <span>メンバー管理</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* プロジェクトコンテキスト */}
        {pjId && (
          <SidebarGroup>
            <SidebarGroupLabel>プロジェクト</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/project/${pjId}/settings`}
                    render={<Link href={`/project/${pjId}/settings`} />}
                  >
                    <Settings />
                    <span>プロジェクト設定</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/project/${pjId}/member`}
                    render={<Link href={`/project/${pjId}/member`} />}
                  >
                    <Users />
                    <span>メンバー管理</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* 環境コンテキスト */}
        {envId && (
          <SidebarGroup>
            <SidebarGroupLabel>環境</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}`}
                    render={<Link href={`/env/${envId}`} />}
                  >
                    <Server />
                    <span>構成図</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/drift`}
                    render={<Link href={`/env/${envId}/drift`} />}
                  >
                    <AlertTriangle />
                    <span>ドリフト検知</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/resources`}
                    render={<Link href={`/env/${envId}/resources`} />}
                  >
                    <List />
                    <span>リソース一覧</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/services`}
                    render={<Link href={`/env/${envId}/services`} />}
                  >
                    <Boxes />
                    <span>Service / Infra</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(`/env/${envId}/deploy`)}
                    render={<Link href={`/env/${envId}/deploy`} />}
                  >
                    <History />
                    <span>デプロイ履歴</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/deploy-queue`}
                    render={<Link href={`/env/${envId}/deploy-queue`} />}
                  >
                    <ListOrdered />
                    <span>デプロイキュー</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/deploy-trigger`}
                    render={<Link href={`/env/${envId}/deploy-trigger`} />}
                  >
                    <Webhook />
                    <span>トリガー / ビルド</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(`/env/${envId}/software`)}
                    render={<Link href={`/env/${envId}/software`} />}
                  >
                    <Code />
                    <span>ソフトウェア</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/settings/variables`}
                    render={<Link href={`/env/${envId}/settings/variables`} />}
                  >
                    <Variable />
                    <span>Variables</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/settings/secrets`}
                    render={<Link href={`/env/${envId}/settings/secrets`} />}
                  >
                    <KeyRound />
                    <span>Secrets</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/logs`}
                    render={<Link href={`/env/${envId}/logs`} />}
                  >
                    <ScrollText />
                    <span>ログ</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === `/env/${envId}/settings`}
                    render={<Link href={`/env/${envId}/settings`} />}
                  >
                    <Settings />
                    <span>環境設定</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-muted-foreground">Stranah Beta</p>
      </SidebarFooter>
    </Sidebar>
  );
}
