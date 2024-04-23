import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecipeCard from '../cards/Card';
import { RecipeCtx } from '../../App';
import { SearchResultProps } from '../../Types';
export function RandomRecipe() {
  const { randomRecipe } = useContext(RecipeCtx);

  return (randomRecipe ?
    <RecipeCard meal={randomRecipe} />
    : <div>No Recipe for the day</div>
  );
}

function SearchResult({ filteredMeals } : SearchResultProps) {

  return (<>
    <Container>
      <Row>
        {filteredMeals && filteredMeals.length > 0 ? filteredMeals.map((m, i) =>
          <RecipeCard meal={m} key={i} />) :
          <RandomRecipe />}
      </Row>
    </Container>
  </>
  );
}

export default SearchResult;