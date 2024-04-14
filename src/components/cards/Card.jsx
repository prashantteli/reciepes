import { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { ReciepeCtx } from '../../App';
import "holderjs";
function ReciepeCard({ meal, showInstructions = false }) {
  const { handleShow, setRreciepeDetails, getReciepeById, setFilteredMeals,
    handleClose, getMealsFitleredBy } = useContext(ReciepeCtx);
  const { strMealThumb, strMeal, strInstructions, strCategory, strArea } = meal;
  const getIngredients = (meal) => {
    let ingredients = {};
    for (let i = 1; i <= 20; i++) {
      let name = meal['strIngredient' + i];
      let measure = meal['strMeasure' + i];
      if (name && measure) {
        ingredients[name] = measure;
      }

    }
    return ingredients;
  };

  const showIngredients = (meal) => {
    if (!meal) {
      return '';
    }
    const ingredients = getIngredients(meal);
    if (!ingredients) {
      return '';
    }
    return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}> {Object.keys(ingredients).map((i) => (
      <><Button variant="light" onClick={() => {
        getMealsFitleredBy(i, 'i').then(res => {
          setFilteredMeals(res.meals);
          handleClose();
        });
      }}>
        {i} <Badge bg="secondary">{ingredients[i]}</Badge>
        <span className="visually-hidden">{ingredients[i]}</span>
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
            getReciepeById(meal.idMeal).then(res => {
              setRreciepeDetails(res.meals[0]);
              handleShow();
            })

          }}>View Reciepe</Button>
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

export default ReciepeCard;