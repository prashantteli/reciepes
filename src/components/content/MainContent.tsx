import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ReciepeCard from '../cards/Card';
import { ReciepeCtx } from '../../App';
import { SearchResultProps } from '../../Types';
export function RandomReciepe() {
  const { randomReciepe } = useContext(ReciepeCtx);

  return (randomReciepe ?
    <ReciepeCard meal={randomReciepe} />
    : <div>No Reciepe for the day</div>
  );
}

function SearchResult({ filteredMeals } : SearchResultProps) {

  return (<>
    <Container>
      <Row>
        {filteredMeals && filteredMeals.length > 0 ? filteredMeals.map((m, i) =>
          <ReciepeCard meal={m} key={i} />) :
          <RandomReciepe />}
      </Row>
    </Container>
  </>
  );
}

export default SearchResult;