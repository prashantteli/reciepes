import { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { ReciepeCtx } from '../../App';
import ReciepeCard from '../cards/Card';

export function ViewReciepe() {
    const { handleClose, show, reciepeDetails } = useContext(ReciepeCtx)
    return <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>{
                reciepeDetails.title
            }</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ReciepeCard meal={reciepeDetails} showInstructions={true} />
        </Offcanvas.Body>
    </Offcanvas>
}
