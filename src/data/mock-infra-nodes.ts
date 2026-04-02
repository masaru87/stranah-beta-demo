import type { Node, Edge } from "@xyflow/react";

// インフラノードのカスタムデータ型
export type InfraNodeData = {
  label: string;
  resourceType:
    | "server"
    | "database"
    | "load-balancer"
    | "router"
    | "switch"
    | "disk"
    | "internet";
  status: "running" | "stopped" | "error" | "creating";
  ip?: string;
  spec?: string;
  metadata: Record<string, string>;
};

// さくらクラウド標準構成（3層 + LB + VPCルーター）
export const mockNodes: Node<InfraNodeData>[] = [
  // インターネットゲートウェイ
  {
    id: "internet-1",
    type: "infra",
    position: { x: 400, y: 0 },
    data: {
      label: "インターネット",
      resourceType: "internet",
      status: "running",
      metadata: {},
    },
  },
  // VPCルーター
  {
    id: "router-1",
    type: "infra",
    position: { x: 400, y: 120 },
    data: {
      label: "VPCルーター",
      resourceType: "router",
      status: "running",
      ip: "192.168.0.1",
      spec: "スタンダード",
      metadata: {
        プラン: "スタンダード",
        インターフェース: "2",
        VRID: "1",
      },
    },
  },
  // グローバルスイッチ
  {
    id: "switch-global",
    type: "infra",
    position: { x: 400, y: 240 },
    data: {
      label: "フロントスイッチ",
      resourceType: "switch",
      status: "running",
      metadata: {
        ネットワーク: "192.168.0.0/24",
        種別: "スイッチ",
      },
    },
  },
  // ロードバランサー
  {
    id: "lb-1",
    type: "infra",
    position: { x: 400, y: 360 },
    data: {
      label: "ロードバランサー",
      resourceType: "load-balancer",
      status: "running",
      ip: "192.168.0.10",
      spec: "ハイスペック",
      metadata: {
        プラン: "ハイスペック",
        VIP: "192.168.0.10",
        ポート: "443",
        バランシング方式: "ラウンドロビン",
      },
    },
  },
  // Webサーバー 1
  {
    id: "web-1",
    type: "infra",
    position: { x: 200, y: 500 },
    data: {
      label: "Webサーバー 1",
      resourceType: "server",
      status: "running",
      ip: "192.168.0.11",
      spec: "2Core / 4GB",
      metadata: {
        コア数: "2",
        メモリ: "4GB",
        OS: "Ubuntu 22.04",
        ディスク: "100GB SSD",
        ホスト名: "web-1.stranah.local",
      },
    },
  },
  // Webサーバー 2
  {
    id: "web-2",
    type: "infra",
    position: { x: 600, y: 500 },
    data: {
      label: "Webサーバー 2",
      resourceType: "server",
      status: "running",
      ip: "192.168.0.12",
      spec: "2Core / 4GB",
      metadata: {
        コア数: "2",
        メモリ: "4GB",
        OS: "Ubuntu 22.04",
        ディスク: "100GB SSD",
        ホスト名: "web-2.stranah.local",
      },
    },
  },
  // バックエンドスイッチ
  {
    id: "switch-backend",
    type: "infra",
    position: { x: 400, y: 640 },
    data: {
      label: "バックエンドスイッチ",
      resourceType: "switch",
      status: "running",
      metadata: {
        ネットワーク: "10.0.0.0/24",
        種別: "スイッチ",
      },
    },
  },
  // Appサーバー
  {
    id: "app-1",
    type: "infra",
    position: { x: 200, y: 780 },
    data: {
      label: "Appサーバー",
      resourceType: "server",
      status: "running",
      ip: "10.0.0.11",
      spec: "4Core / 8GB",
      metadata: {
        コア数: "4",
        メモリ: "8GB",
        OS: "Ubuntu 22.04",
        ディスク: "200GB SSD",
        ホスト名: "app-1.stranah.local",
      },
    },
  },
  // データベース
  {
    id: "db-1",
    type: "infra",
    position: { x: 600, y: 780 },
    data: {
      label: "データベース",
      resourceType: "database",
      status: "running",
      ip: "10.0.0.21",
      spec: "4Core / 8GB / 500GB",
      metadata: {
        タイプ: "データベースアプライアンス",
        エンジン: "PostgreSQL 15",
        コア数: "4",
        メモリ: "8GB",
        ストレージ: "500GB SSD",
        レプリケーション: "無効",
      },
    },
  },
];

export const mockEdges: Edge[] = [
  {
    id: "e-internet-router",
    source: "internet-1",
    target: "router-1",
    animated: true,
  },
  {
    id: "e-router-switch-global",
    source: "router-1",
    target: "switch-global",
  },
  {
    id: "e-switch-global-lb",
    source: "switch-global",
    target: "lb-1",
  },
  {
    id: "e-lb-web1",
    source: "lb-1",
    target: "web-1",
  },
  {
    id: "e-lb-web2",
    source: "lb-1",
    target: "web-2",
  },
  {
    id: "e-web1-switch-backend",
    source: "web-1",
    target: "switch-backend",
  },
  {
    id: "e-web2-switch-backend",
    source: "web-2",
    target: "switch-backend",
  },
  {
    id: "e-switch-backend-app",
    source: "switch-backend",
    target: "app-1",
  },
  {
    id: "e-switch-backend-db",
    source: "switch-backend",
    target: "db-1",
  },
];

export function getInfraNodes(_envId: string): Node<InfraNodeData>[] {
  return mockNodes;
}

export function getInfraEdges(_envId: string): Edge[] {
  return mockEdges;
}
