import {
  AppBar,
  Button,
  Card,
  CardContent,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import * as React from "react";
import "./App.css";

interface IState {
  apiError: boolean;
  apiReturn: boolean;
  image: string;
  name: string;
  playerClass: string;
  rarity: string;
  set: string;
  type: string;
  url: string;
  userInput: string;
}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      apiError: false,
      apiReturn: false,
      image: "",
      name: "",
      playerClass: "",
      rarity: "",
      set: "",
      type: "",
      url: "defaultvalue",
      userInput: ""
    };
    this.getCardData = this.getCardData.bind(this);
    this.changeText = this.changeText.bind(this);
    this.generateURL = this.generateURL.bind(this);
  }

  public generateURL() {
    this.setState({
      url:
        "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" +
        this.state.userInput.replace(" ", "%20") +
        "?collectible=1"
    });
  }

  public changeText(event: { target: { value: any } }) {
    this.setState({ userInput: event.target.value });
  }

  public getCardData() {
    this.setState(
      {
        url:
          "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" +
          this.state.userInput.replace(" ", "%20") +
          "?collectible=1"
      },
      () => {
        axios({
          headers: {
            "X-Mashape-Key":
              "Y4H5cINPWZmshIODg07oD8Zi67ESp18YjOnjsn8LUMR1tSpNVV"
          },
          method: "get",
          url: this.state.url
        })
          .then((response: any) => {
            global.console.log(response);
            global.console.log(!response.ok);
            if (response.status === 200) {
              this.setState({
                apiReturn: true,
                image: response.data[0].img,
                name: response.data[0].name,
                playerClass: response.data[0].playerClass,
                rarity: response.data[0].rarity,
                set: response.data[0].cardSet,
                type: response.data[0].type
              });
            }
          })
          .catch(error => {
            global.console.log(error);
            this.setState({
              apiError: true,
              apiReturn: false
            });
          });
      }
    );
  }

  public render() {
    if (this.state.apiReturn === true) {
      return (
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Hearthstone Card Info
              </Typography>
              <div className="searchArea">
                <SearchIcon id="searchIcon" />
                <TextField
                  type="text"
                  placeholder="Search..."
                  onChange={this.changeText}
                />
                <Button
                  variant="contained"
                  id="searchButton"
                  size="small"
                  onClick={this.getCardData}
                >
                  Search
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Card className="displayCard">
            <CardContent>
              <div className="column cardImage">
                <img src={this.state.image} />
              </div>
              <div className="column cardInfo">
                <Typography variant="display1">
                  Name: {this.state.name}
                </Typography>
                <Typography variant="display1">
                  Class: {this.state.playerClass}
                </Typography>
                <Typography variant="display1">
                  Rarity: {this.state.rarity}
                </Typography>
                <Typography variant="display1">
                  Set: {this.state.set}
                </Typography>
                <Typography variant="display1">
                  Type: {this.state.type}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else if (this.state.apiError === false) {
      return (
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Hearthstone Card Info
              </Typography>
              <div className="searchArea">
                <SearchIcon id="searchIcon" />
                <TextField
                  type="text"
                  placeholder="Search..."
                  onChange={this.changeText}
                />
                <Button
                  variant="contained"
                  id="searchButton"
                  size="small"
                  onClick={this.getCardData}
                >
                  Search
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Card className="displayCard">
            <CardContent>
              <Typography>
                Welcome to the Hearthstone Card Info app! Try searching for a
                card in the search bar above to get started!
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Hearthstone Card Info
              </Typography>
              <div className="searchArea">
                <SearchIcon id="searchIcon" />
                <TextField
                  type="text"
                  placeholder="Search..."
                  onChange={this.changeText}
                />
                <Button
                  variant="contained"
                  id="searchButton"
                  size="small"
                  onClick={this.getCardData}
                >
                  Search
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Card className="displayCard">
            <CardContent>
              <Typography>
                Looks like that card doesn't exist! Try making sure your
                punctuation is right, e.g. "dr. boom" instead of "dr boom".
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}

export default App;
