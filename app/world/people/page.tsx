import type { Metadata } from "next";
import { getPeople } from "@/lib/content";
import PeopleGrid from "@/components/PeopleGrid";

export const metadata: Metadata = {
  title: "People — Chardi Kala",
  description:
    "The figures the watershed remembers: well-listeners, grid-weavers, gardeners of the border, singers of the covenant.",
};

export default function PeoplePage() {
  const people = getPeople();

  return (
    <main className="page">
      <p className="pageKicker">ਲੋਕ · the remembered</p>
      <h1 className="pageTitle">
        People of the <span className="gurmukhi">ਪੰਜਾਬ</span> Watershed
      </h1>
      <p className="pageLede">
        The chronicle does not keep kings. It keeps the ones who listened to
        wells, wove kitchens into grids, composted a border, and signed
        promises sized to a lifespan. Six of them, in their own words.
      </p>
      <PeopleGrid people={people} />
    </main>
  );
}
