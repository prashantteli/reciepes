
import React, { useEffect, useState, createContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/header/Header';
import SideBar from './components/sideBar/SideBar';
import MainContent from './components/content/MainContent';
import Loading from './components/loading/Loading';
import { getCategories, getRecipesFitleredBy, getCountries, getRandomRecipe, getById } from './WebApi';
import './App.scss';
import { ViewRecipe } from './components/content/ViewRecipe';
import { Recipe } from './Types.js';

interface RecipeCxtTypes {
  randomRecipe: Recipe | undefined,
  handleShow: () => void,
  handleClose: () => void,
  getMealsFitleredBy: any,
  recipeDetails: any,
  setRrecipeDetails: any,
  setFilteredMeals: any,
  sideBarLoading: any,
  getRecipeById: (id : string) => Promise<{meals : Recipe[]}>,
  show: boolean,
}
export const RecipeCtx = createContext<RecipeCxtTypes>({} as RecipeCxtTypes);

function getCategoriesData() {
  return getCategories();
}

function getMealsFitleredBy(filterBy: string, filter: string) {
  return getRecipesFitleredBy(filterBy, filter);
}

function getCountriesData() {
  return getCountries();
}

function getRandomRecipesDate() {
  return getRandomRecipe();
}

function getRecipeById(id: string) {
  return getById(id);
}

function App() {
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomRecipe, setRandomrandomRecipe] = useState<Recipe>();
  const [recipeDetails, setRrecipeDetails] = useState('');
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

    getRandomRecipesDate().then(res => {
      setRandomrandomRecipe(res.meals[0]);
      setMainContentLoading(false);
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (<>
    <RecipeCtx.Provider value={{
      randomRecipe, handleShow, handleClose, getMealsFitleredBy, recipeDetails,
      setRrecipeDetails, setFilteredMeals, sideBarLoading, getRecipeById, show
    }}>
      <Header />

      <section className={'main'}>
        <Container>
          <Row>
            <Col md="8">
              {mainContentLoading ? <Loading showButton={true} />
                : <MainContent filteredMeals={filteredMeals} />}
            </Col>
            <Col md="4">
              <SideBar>
                <SideBar.Section list={countries} index="strArea" heading="Countries" />
                <SideBar.Section list={categories} index="strCategory" heading="Categories" />
              </SideBar>
            </Col>
          </Row>
        </Container>
      </section>
      <ViewRecipe />
    </RecipeCtx.Provider >
  </>

  );
}

export default App;
