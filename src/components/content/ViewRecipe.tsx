import { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { RecipeCtx } from '../../App';
import RecipeCard from '../cards/Card';

export function ViewRecipe() {
    const { handleClose, show, recipeDetails } = useContext(RecipeCtx)
    return <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>{
                recipeDetails.title
            }</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <RecipeCard meal={recipeDetails} showInstructions={true} />
        </Offcanvas.Body>
    </Offcanvas>
}
