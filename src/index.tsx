import React from "react";
import ReactDOM from "react-dom";
import Switch from "./Switch";

interface State {
    isSwitchChecked: boolean;
    isSwitchDisabled: boolean;

    controlledSwitchValue: string;
    uncontrolledSwitchValue: string;
}

interface Props {}

class App extends React.PureComponent<Props, State> {
    public state: State = {
        isSwitchChecked: true,
        isSwitchDisabled: false,

        controlledSwitchValue: "",
        uncontrolledSwitchValue: "",
    };

    private switch: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.switch = React.createRef() as React.RefObject<HTMLInputElement>;
    }
    onToggleDisable = () => this.setState({isSwitchDisabled: !this.state.isSwitchDisabled});

    onChange = (checked: boolean) => this.setState({isSwitchChecked: checked});

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const uncontrolledSwitchValue = this.switch.current ? this.switch.current.checked : false;

        this.setState({controlledSwitchValue: this.state.isSwitchChecked.toString(), uncontrolledSwitchValue: uncontrolledSwitchValue.toString()});
    };

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <form onSubmit={this.onSubmit}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Switch checked={this.state.isSwitchChecked} disabled={this.state.isSwitchDisabled} onChange={this.onChange} />
                        <label style={{marginLeft: "10px"}}>Controlled Switch Component</label>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Switch ref={this.switch} checked={this.state.isSwitchChecked} disabled={this.state.isSwitchDisabled} />
                        <label style={{marginLeft: "10px"}}>Uncontrolled Switch Component</label>
                    </div>
                    <button style={{marginTop: "10px"}} type="button" onClick={this.onToggleDisable}>
                        Toggle Disable
                    </button>
                    <button type="submit" style={{marginLeft: "5px"}}>
                        Submit
                    </button>
                </form>
                <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
                    <span>Controlled Switch Value Submited: {this.state.controlledSwitchValue}</span>
                    <span>Uncontrolled Switch Value Submited: {this.state.uncontrolledSwitchValue}</span>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app")!);
