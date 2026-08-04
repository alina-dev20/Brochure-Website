import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-eyebrow">ошибка 404</p>
        <h1 className="h-display mt-4 text-5xl sm:text-7xl">
          Эта страница не пришла на праздник
        </h1>
        <p className="mt-5 max-w-md text-muted">
          Кажется, ссылка устарела или в адресе опечатка. Зато каталог
          приглашений точно на месте.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
          >
            На главную
          </Link>
          <Link
            href="/catalog"
            className="rounded-full border border-line px-8 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Открыть каталог
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
