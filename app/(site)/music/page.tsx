import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrackList } from "@/components/TrackList";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Музыка для приглашений — подборка композиций",
  description:
    "Подборка фоновых композиций для электронных приглашений: нежные, торжественные, детские и деловые. Прослушайте прямо на странице или пришлите свою.",
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ href: "/music", label: "Музыка" }]} />
      <Reveal>
        <h1 className="h-display mt-6 text-4xl sm:text-6xl">Музыка</h1>
        <p className="mt-4 max-w-xl text-muted">
          Мелодия начинает играть, когда гость открывает приглашение — по
          нажатию, без внезапного звука. Выберите настроение из подборки или
          пришлите свой трек (доп. услуга «Своя музыка»).
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-10">
        <TrackList />
      </Reveal>
      <p className="mt-8 text-sm text-muted">
        Уже выбрали?{" "}
        <Link href="/#zayavka" className="font-semibold text-accent hover:underline">
          Укажите название трека в заявке
        </Link>{" "}
        — подставим его в ваше приглашение.
      </p>
    </div>
  );
}
