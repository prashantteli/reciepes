import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Loading({ showButton=false }) {
    return <>
        {showButton && <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>}
        {!showButton &&
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        }
    </>;
}