"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Node } from "@xyflow/react";
import { EnvHeader } from "@/components/environment/env-header";
import { InfraDiagram } from "@/components/environment/infra-diagram";
import { NodeDetailPanel } from "@/components/environment/node-detail-panel";
import { getEnvironment } from "@/data/mock-environments";
import { getInfraNodes, getInfraEdges } from "@/data/mock-infra-nodes";
import type { InfraNodeData } from "@/data/mock-infra-nodes";

export default function EnvironmentDetailPage() {
  const params = useParams();
  const envId = params.envId as string;

  const environment = getEnvironment(envId) ?? {
    id: envId,
    projectId: "pj-1",
    name: "開発環境",
    type: "dev" as const,
    status: "active" as const,
    templateId: "tpl-1",
    resourceCount: 8,
    lastDeployedAt: "2026-03-28T10:30:00Z",
    updatedAt: "2026-03-28T10:30:00Z",
  };

  const nodes = getInfraNodes(envId);
  const edges = getInfraEdges(envId);

  const [selectedNode, setSelectedNode] =
    useState<Node<InfraNodeData> | null>(null);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="shrink-0 px-6 pt-4 pb-2">
        <EnvHeader environment={environment} />
      </div>
      <div className="flex-1 min-h-0">
        <InfraDiagram
          initialNodes={nodes}
          initialEdges={edges}
          onNodeSelect={setSelectedNode}
        />
      </div>
      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}
