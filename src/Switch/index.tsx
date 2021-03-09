import React from "react";
import clsx from "clsx";
import "./index.css";

// If you wanna implement by TypeScript (Advanced Requirement 1), then rename this file to index.tsx and remove index.jsx
// Otherwise, remove this file

interface Props {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}

interface State {
    checked: boolean;
}

class SwitchBase extends React.PureComponent<Props & {inputRef?: React.Ref<HTMLInputElement>}, State> {
    private inputRef: React.RefObject<HTMLInputElement> | undefined;
    constructor(props: Props) {
        super(props);
        const {checked = false, inputRef} = this.props;
        this.state = {
            checked,
        };

        this.handleInputChange = this.handleInputChange.bind(this);

        this.inputRef = (inputRef || React.createRef()) as React.RefObject<HTMLInputElement>;
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.disabled) {
            return;
        }
        const newChecked = event.target.checked;
        this.setState({checked: event.target.checked});
        if (this.props.onChange) {
            this.props.onChange(newChecked);
        }
    };

    render() {
        return (
            <div className="comp-switch">
                <div
                    className={clsx({
                        "switch-wrapper-unchecked": !this.state.checked,
                        "switch-wrapper": true,
                        "switch-wrapper-disabled": this.props.disabled,
                    })}
                >
                    <div
                        className={clsx({
                            "switch-toggle-unchecked": !this.state.checked,
                            "switch-toggle": true,
                            "switch-toggle-disabled": this.props.disabled,
                        })}
                    >
                        <input type="checkbox" ref={this.inputRef} className={"switch-input"} checked={this.state.checked} onChange={this.handleInputChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default React.forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => <SwitchBase inputRef={ref} {...props} />);
