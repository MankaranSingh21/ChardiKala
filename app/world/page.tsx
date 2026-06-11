import { getRegions } from "@/lib/content";
import WorldExplorer from "@/components/WorldExplorer";

export default function HomePage() {
  const regions = getRegions();
  return <WorldExplorer regions={regions} />;
}
