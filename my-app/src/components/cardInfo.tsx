import * as React from "react";
// import IState from "../App";

interface IState {
  image: string;
  name: string;
  playerClass: string;
  rarity: string;
  set: string;
  type: string;
}

export default class CardInfo extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      image: "",
      name: "",
      playerClass: "",
      rarity: "",
      set: "",
      type: ""
    };
    global.console.log(this.props);
  }

  public render() {
    return <h1>Card info</h1>;
  }
}
