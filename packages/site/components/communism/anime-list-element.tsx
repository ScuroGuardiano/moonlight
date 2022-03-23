import styled from "styled-components";
import ISeries from "../../interfaces/series";

export interface AnimeListElementProps {
  series: ISeries;
}

const StyledAnimeListElement = styled.li`
  border: solid 2px red;
  display: flex;
  .image {
    width: 54px;
    height: 96px;
    box-sizing: border-box;
    border-right: solid 2px red;
    margin: 2px;
  }
`;

export default function AnimeListElement({ series }: AnimeListElementProps) {
  return (
    <StyledAnimeListElement>
      <div className="image"> image </div>
      <div>
        <a href={`/series/${series.id}`}>
          <h3>{series.name}</h3>
        </a>
      </div>
      <div>
        {series.type}<br/>
        {series.episodesCount}<br/>
        {series.status}<br/>
        {series.targetGroup}<br/>
        {series.ageRating}<br/>
      </div>
    </StyledAnimeListElement>
  )
}
