
import { useEffect, useState, createContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Header from './components/header/Header';
import SideBar from './components/sideBar/SideBar.jsx';
import MainContent from './components/content/MainContent';
import Loading from './components/loading/Loading.jsx';
import { getCategories, getReciepesFitleredBy, getCountries, getRandomReciepe, getById } from './WebApi';
import './App.scss';
import { ViewReciepe } from './components/content/ViewReciepe.jsx';

export const ReciepeCtx = createContext(null);

function getCategoriesData() {
  return getCategories();
}

function getMealsFitleredBy(filterBy, filter) {
  return getReciepesFitleredBy(filterBy, filter);
}

function getCountriesData() {
  return getCountries();
}

function getRandomReciepesDate() {
  return getRandomReciepe();
}

function getReciepeById(id) {
  return getById(id);
}

function App() {
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomReciepe, setRandomrandomReciepe] = useState([]);
  const [reciepeDetails, setRreciepeDetails] = useState('');
  const [show, setShow] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [mainContentLoading, setMainContentLoading] = useState(false);
  const [sideBarLoading, setsideBarLoading] = useState(false);
  useEffect(() => {
    setMainContentLoading(true);
    setsideBarLoading(true);

    getCategoriesData().then(res => {
      setCategories(res.categories);
      setsideBarLoading(false);
    });
    
    getCountriesData().then(res => {
      setCountries(res.meals);
      setsideBarLoading(false);
    });

    getRandomReciepesDate().then(res => {
      setRandomrandomReciepe(res.meals[0]);
      setMainContentLoading(false);
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (<>
    <ReciepeCtx.Provider value={{
      randomReciepe, handleShow, handleClose, getMealsFitleredBy, reciepeDetails,
      setRreciepeDetails, setFilteredMeals, sideBarLoading, getReciepeById, show
    }}>
      <Header />

      <section className={'main'}>
        <Container>
          <Row>
            <Col md="8">
              {mainContentLoading ? <Loading showButton={true}/>
                : <MainContent filteredMeals={filteredMeals} />}
            </Col>
            <Col md="4">
              <SideBar>
                <SideBar.Section list={countries} index="strArea" heading="Countries"
                  getMealsFitleredBy={getMealsFitleredBy} />
                <SideBar.Section list={categories} index="strCategory" heading="Categories"
                  getMealsFitleredBy={getMealsFitleredBy} />
              </SideBar>
            </Col>
          </Row>
        </Container>
      </section>
      <ViewReciepe />
    </ReciepeCtx.Provider >
  </>

  );
}

export default App;
