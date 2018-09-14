import * as React from "react";

export default class SearchBar extends React.Component<{}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <form>
          <input type="text" />
          <button>Search</button>
        </form>
      </div>
    );
  }
}
