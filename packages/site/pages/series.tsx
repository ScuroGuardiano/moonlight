import AnimeList from "../components/communism/anime-list";
import Layout from "../components/layout/layout"
import { API_URL } from "../constants"
import ISeries from "../interfaces/series"

export default function Series({ series }: { series: ISeries[] }) {
  return (
    <Layout>
      <div>
        <AnimeList series={series} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/anime`);
  const data = await res.json() as ISeries[];
  
  return { props: { series: data } }
}
