import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Container, Row, Col} from "react-bootstrap";


const PLACES = [
    {name: "Харьков", city: "Kharkov"},
    {name: "Свесса", city: "Svesa"},
    {name: "Сумы", city: "Sumy"},
    {name: "Киев", city: "Kyiv"}
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }

    componentDidMount() {
        const city = this.props.city;
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=789d8bf96c25b83d0b02c6bb6f750d34&units=metric";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({weatherData: json});
        });
    }

    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description}/>
                </h1>
                <p>Current: {(weatherData.main.temp).toFixed(0)}°С</p>
                <p>High: {(weatherData.main.temp_max).toFixed(0)}°С</p>
                <p>Low: {(weatherData.main.temp_min).toFixed(0)}°С</p>
                <p>Wind Speed: {(weatherData.wind.speed)} m/s</p>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePlace: 0,
        };
    }

    render() {
        const activePlace = this.state.activePlace;

        return (
            <div>
                <Navbar>
                    {/*<Navbar.Header>*/}
                        <Navbar.Brand>
                            React Simple Weather App
                        </Navbar.Brand>
                    {/*</Navbar.Header>*/}
                </Navbar>
                <Container>
                    <Row>
                        <Col md={4} sm={4}>
                            <h3>Select a city</h3>
                            <Nav
                                className="flex-sm-column"
                                variant="pills"
                                activeKey={activePlace}
                                onSelect={index => {
                                    this.setState({activePlace: index});
                                }}
                            >
                                {PLACES.map((place, index) => (
                                    <NavItem>
                                        <Nav.Link key={index} eventKey={index}>{place.name}</Nav.Link>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Col>
                        <Col md={8} sm={8}>
                            <WeatherDisplay key={activePlace} city={PLACES[activePlace].city}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
