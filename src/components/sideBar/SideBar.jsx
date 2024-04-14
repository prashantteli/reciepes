
import { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { ReciepeCtx } from '../../App';
import Loading from '../loading/Loading.jsx';

export function SideBarSection({ list, index, heading }) {
  const { getMealsFitleredBy, setFilteredMeals, sideBarLoading } = useContext(ReciepeCtx);
  return (<>
    <Row>
      <Col>
        <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
          <h6>{heading}</h6>
          {sideBarLoading ? <Loading /> : <ListGroup className="my-2">
            {
              list && list.map((c, i) => <ListGroup.Item key={i}
                data-name={c[index]}
                action={true}
                onClick={(e) => {
                  let filteredBy = e.target.dataset.name;
                  let filter = (heading === 'Categories') ? 'c' : 'a';
                  getMealsFitleredBy(filteredBy, filter).then(res => {
                    setFilteredMeals(res.meals);
                  })
                }}>
                {c[index]}
              </ListGroup.Item>)
            }
          </ListGroup>}
        </div>
      </Col>
    </Row>
  </>);

}

export default function SideBar({ children }) {
  return <Container>
    {
      children
    }
  </Container>
}

SideBar.Section = SideBarSection;