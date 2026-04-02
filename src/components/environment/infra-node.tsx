"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { InfraNodeData } from "@/data/mock-infra-nodes";
import {
  Server,
  Database,
  Network,
  Router,
  Cable,
  HardDrive,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  server: Server,
  database: Database,
  "load-balancer": Network,
  router: Router,
  switch: Cable,
  disk: HardDrive,
  internet: Globe,
} as const;

const statusColors = {
  running: "bg-emerald-500",
  stopped: "bg-gray-400",
  error: "bg-red-500",
  creating: "bg-blue-500 animate-pulse",
} as const;

const borderColors = {
  running: "border-emerald-200 dark:border-emerald-900",
  stopped: "border-gray-200 dark:border-gray-700",
  error: "border-red-200 dark:border-red-900",
  creating: "border-blue-200 dark:border-blue-900",
} as const;

function InfraNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as unknown as InfraNodeData;
  const Icon = iconMap[nodeData.resourceType] || Server;

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-border" />
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border-2 bg-card px-4 py-3 shadow-sm transition-all",
          borderColors[nodeData.status],
          selected && "ring-2 ring-primary ring-offset-2"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{nodeData.label}</span>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                statusColors[nodeData.status]
              )}
            />
          </div>
          {nodeData.spec && (
            <span className="text-xs text-muted-foreground">
              {nodeData.spec}
            </span>
          )}
          {nodeData.ip && (
            <span className="font-mono text-xs text-muted-foreground">
              {nodeData.ip}
            </span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-border" />
    </>
  );
}

export const InfraNode = memo(InfraNodeComponent);
