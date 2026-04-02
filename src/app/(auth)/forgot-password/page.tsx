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

const schema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
});

type ForgotPasswordForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  function onSubmit(_data: ForgotPasswordForm) {
    setSent(true);
  }

  if (sent) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">メールを送信しました</CardTitle>
          <CardDescription>
            入力されたメールアドレス宛にパスワード再設定リンクを送信しました。メールをご確認ください。
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline"
          >
            ログイン画面に戻る
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
        <CardTitle className="text-xl">パスワードの再設定</CardTitle>
        <CardDescription>
          登録済みのメールアドレスを入力してください。再設定リンクを送信します。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              再設定リンクを送信
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:underline"
        >
          ログイン画面に戻る
        </Link>
      </CardFooter>
    </Card>
  );
}
