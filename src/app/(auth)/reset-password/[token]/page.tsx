"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Server, CheckCircle } from "lucide-react";

const schema = z
  .object({
    password: z.string().min(8, "パスワードは8文字以上で入力してください"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "パスワードが一致しません",
    path: ["confirm"],
  });

type ResetPasswordForm = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false);
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });

  function onSubmit(_data: ResetPasswordForm) {
    setDone(true);
  }

  if (done) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">パスワードを変更しました</CardTitle>
          <CardDescription>
            新しいパスワードでログインしてください。
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline"
          >
            ログイン画面へ
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Server className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">新しいパスワードの設定</CardTitle>
        <CardDescription>
          新しいパスワードを入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新しいパスワード</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード確認</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              パスワードを変更
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
