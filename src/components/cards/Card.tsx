import { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { RecipeCardProps, Recipe } from '../../Types';
import { RecipeCtx } from '../../App';
//import "holderjs";
function RecipeCard({ meal, showInstructions = false }: RecipeCardProps) {
  const { handleShow, setRrecipeDetails, getRecipeById, setFilteredMeals,
    handleClose, getMealsFitleredBy } = useContext(RecipeCtx);
  const { strMealThumb, strMeal, strInstructions, strCategory, strArea } = meal;
  const getIngredients : (meal: Recipe) => unknown = () => {
    let ingredients: {
      name?: string | true | Date
    } = {};
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i as keyof typeof meal] && meal['strIngredient' + i as keyof typeof meal]) {
        let name = meal['strIngredient' + i as keyof typeof meal];
        let measure = meal['strIngredient' + i as keyof typeof meal];
        if (name && measure) {
          ingredients[name as keyof typeof ingredients] = measure;
        }
      }


    }
    return ingredients;
  };

  const showIngredients : (meal : Recipe) => JSX.Element | '' = (meal : Recipe) => {
    if (!meal) {
      return '';
    }
    const ingredients = getIngredients(meal);
    if (!ingredients) {
      return '';
    }
    return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}> {Object.keys(ingredients).map((i) => (
      <><Button variant="light" onClick={() => {
        getMealsFitleredBy(i, 'i').then((res: { meals: any; }) => {
          setFilteredMeals(res.meals);
          handleClose();
        });
      }}>
        {i} <Badge bg="secondary">{ingredients[i as keyof typeof ingredients]}</Badge>
        <span className="visually-hidden">{ingredients[i as keyof typeof ingredients]}</span>
      </Button> {' '}
      </>))
    }</div>
  }

  return (
    <Col md={showInstructions ? 12 : 6}>
      <Card className="mb-2">
        <Card.Img variant="top" src={strMealThumb} />
        <Card.Body>
          <Card.Title>{strMeal}</Card.Title>
          {showInstructions && <Card.Text>
            {strInstructions}
          </Card.Text>}
        </Card.Body>
        <ListGroup className="list-group-flush">
          {showInstructions && <>
            <ListGroup.Item><b>Country:</b> {strArea}</ListGroup.Item>
            <ListGroup.Item><b>Category:</b> {strCategory}</ListGroup.Item>
            <ListGroup.Item><b>Ingredients:</b> <br />
              {showIngredients(meal)}</ListGroup.Item>
          </>}
        </ListGroup>
        {!showInstructions && <Card.Body>
          <Button variant="primary" onClick={() => {
            getRecipeById(meal.idMeal).then(res => {
              setRrecipeDetails(res.meals[0]);
              handleShow();
            })

          }}>View Recipe</Button>
        </Card.Body>}
      </Card >
    </Col >
  );
}

export function PlaceHolderCard() {
  return (<>
    <Card className="mb-2">
      <Card.Header><Placeholder xs={6} /></Card.Header>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={6} />
      </Card.Body>
    </Card>
  </>);
}

export default RecipeCard;