import React from 'react';
import { Jumbotron, Container, Form, Col, Button, Row} from 'react-bootstrap';
import Example from '../components/Charts'
import GlobalCard from '../components/GlobalCard';
import CountryCard from '../components/CountryCard';
import StateCard from '../components/StateCard';
import { searchByState } from '../utils/API';


// use booksearch for an example on functionality of search input 
const Homepage = () => {

  // create state for holding returned api data
  const [searchedUsState, setSearchedUsState] = useState([]);

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // THIS CAN BE USED FOR SAVED IDs 
  // create state to hold saved stateID values (discuss with rest of team how to implement)
  //const [savedStateIds, setSavedStateIds] = useState(getSavedStateIds()); // still need to define getSavedStateIds()

  //const [saveState, { error }] = useMutation(SAVE_STATE);  // still need to define([
  
  // set up useEffect hook to save 'saveStateIds' list to localStorage on component unmount
 // useEffect(() => {
   // return () => saveStateIds(savedStateIds);
  //});

  // create method to search for US States and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchByState (searchInput);
      console.log(searchInput);
      console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);

      
      // replace all of this with the state api and data variables
      const stateData = () => ({
        confirmed: data.Confirmed,
        deaths: data.Deaths,
        newConfirmed: data.NewConfirmed,
        newDeaths: data.NewDeaths,
        lastUpdate: data.Last_Update,
      });

      // if (stateData !== 'undefined') {
      //   return <Redirect  to="/region/" />
      // }
      

      console.log(stateData);
      console.log('total cases', data.Confirmed);
      console.log('total deaths', data.Deaths);
      console.log('new cases', data.NewConfirmed);
      console.log('new deaths', data.NewDeaths);
      console.log('update time', data.Last_Update);


      setSearchedUsState(stateData);
      setSearchInput('');
    
      
    } catch (err) {
      console.error(err);
    }

    


  };





    return (
        <>
        {/* <div class="jumbotron-fluid" ></div> */}
        <Jumbotron fluid className='text-light bg-danger' style={{ height: 560, clear: "both", paddingTop: 200, paddingLeft: 200}}>
        <Container>
          <h5>Search for your state</h5>
          <Form onSubmit={handleFormSubmit}>
          {/* <Form onSubmit={handleFormSubmit}> -- FROM BOOK SEARCH */ }
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='md'
                  placeholder='Please enter a state'
                />
                <i className="app-claim">* This application is intended for US states only</i>
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='danger' size='md'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h1 className="header text-center">COVID-19 Tracker</h1>
      </Container>

      <Container fluid>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 0.1 }}>
                    <GlobalCard/>
                </Col>

                <Col sm="12" md={{ size: 6, offset: 0.1 }}>
                    <CountryCard/>
                </Col>

              </Row>
        </Container>

        <Example/>
        <StateCard stateSearch={searchInput}/>
        </>
    );
};


export default Homepage; 
