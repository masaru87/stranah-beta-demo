"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { InfraNode } from "./infra-node";
import type { InfraNodeData } from "@/data/mock-infra-nodes";

type InfraDiagramProps = {
  initialNodes: Node<InfraNodeData>[];
  initialEdges: Edge[];
  onNodeSelect: (node: Node<InfraNodeData> | null) => void;
};

export function InfraDiagram({
  initialNodes,
  initialEdges,
  onNodeSelect,
}: InfraDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ infra: InfraNode }), []);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      onNodeSelect(node as Node<InfraNodeData>);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { strokeWidth: 2 },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} />
        <Controls position="bottom-left" />
        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          className="!bg-muted/50"
        />
      </ReactFlow>
    </div>
  );
}
