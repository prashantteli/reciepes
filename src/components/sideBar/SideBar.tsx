
import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { ReciepeCtx } from '../../App';
import Loading from '../loading/Loading';
import { Recipe, resType, SideBarSectionProps } from '../../Types';

export function SideBarSection({ list, index, heading }: SideBarSectionProps) {
  const { getMealsFitleredBy, setFilteredMeals, sideBarLoading } = useContext(ReciepeCtx);
  return (<>
    <Row>
      <Col>
        <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
          <h6>{heading}</h6>
          {sideBarLoading ? <Loading /> : <ListGroup className="my-2">
            {
              list && list.map((c: Recipe, i: number) => <ListGroup.Item key={i}
                data-name={c[index as keyof typeof c]}
                action={true}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  let target = e.target as HTMLInputElement;
                  let filteredBy: string | undefined = target.dataset.name;
                  let filter = (heading === 'Categories') ? 'c' : 'a';
                  getMealsFitleredBy(filteredBy, filter).then((res: resType) => {
                    setFilteredMeals(res.meals);
                  })
                }}>
                <>
                  {
                    c[index as keyof typeof c]
                  }
                </>
              </ListGroup.Item>)
            }
          </ListGroup>}
        </div>
      </Col>
    </Row>
  </>);

}

export default function SideBar({ children } : {children : JSX.Element[]}) {
  return <Container>
    {
      children
    }
  </Container>
}

SideBar.Section = SideBarSection;