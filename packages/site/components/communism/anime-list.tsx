import styled from "styled-components";
import ISeries from "../../interfaces/series";
import AnimeListElement from "./anime-list-element";

export interface AnimeListProps {
  series: ISeries[];
}

const StyledAnimeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

export default function AnimeList({ series }: AnimeListProps) {
  return (
    <StyledAnimeList>
      { series.map(s => <AnimeListElement key={s.id} series={s} />) }
    </StyledAnimeList>
  )
}
