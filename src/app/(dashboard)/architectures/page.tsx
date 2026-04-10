import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { mockTemplates } from "@/data/mock-projects";

export default function ArchitecturesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">テンプレート</h1>
        <p className="text-muted-foreground">
          Stranah提供のインフラ構成テンプレート
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockTemplates.map((tpl) => (
          <Link key={tpl.id} href={`/architectures/${tpl.id}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{tpl.name}</CardTitle>
                    <CardDescription className="mt-0.5">
                      {tpl.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {tpl.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    v{tpl.version}
                  </Badge>
                  {tpl.resourceTypes.map((rt) => (
                    <Badge key={rt} variant="outline" className="text-xs">
                      {rt}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
