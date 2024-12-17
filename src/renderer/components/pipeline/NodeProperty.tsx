import React, {Component, ChangeEvent} from "react";
import {Input, Form, Collapse, Card} from "antd";
import {NodeConfig, NodeData} from "../../../data/pipeline/NodeData";

interface NodeProps {
    data: NodeData<any>;
}

interface NodeState {
    config: NodeConfig;
}

class NodeProperty extends Component<NodeProps, NodeState> {
    constructor(props: NodeProps) {
        super(props);
        this.state = {
            config: props.data.config,
        };
    }

    componentDidUpdate(prevProps: NodeProps) {
        // Check if the data prop has changed
        if (prevProps.data !== this.props.data) {
            // Update the internal state with the new config
            this.setState({
                config: this.props.data.config,
            });
        }
    }

    handleInputChange = (key: string, event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        this.setState((prevState) => ({
            config: {
                ...prevState.config,
                [key]: value,
            },
        }));
        this.props.data.config[key] = value;
    };

    handleSave = () => {
        const {config} = this.state;
        this.props.data.config = config;
    };

    getLabel = () => {
        const label = this.props.data.getLabel();
        return label;
    }

    renderChildren = () => {
        const {config} = this.state;

        return (<Form layout="vertical">
            {Object.entries(config).map(([key, value]) => {
                    return (
                        <Form.Item key={key} label={key}>
                            <Input
                                value={value}
                                onChange={(event) => this.handleInputChange(key, event)}
                            />
                        </Form.Item>
                    )
                }
            )}
        </Form>)
    }

    render() {
        return (
            <Card title={`${this.getLabel()} (${this.props.data.position.x}, ${this.props.data.position.y})`}>
                {this.renderChildren()}
            </Card>
        );
    }
}

export default NodeProperty;
