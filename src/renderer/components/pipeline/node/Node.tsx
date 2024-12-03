import React, {Component, ChangeEvent} from "react";
import {Input, Form, Collapse} from "antd";
import {NodeConfig, NodeData} from "../../../../data/pipeline/NodeData";

interface NodeProps {
    data: NodeData<any>;
}

interface NodeState {
    config: NodeConfig;
}

class Node extends Component<NodeProps, NodeState> {
    constructor(props: NodeProps) {
        super(props);
        this.state = {
            config: props.data.config,
        };
    }

    handleInputChange = (key: string, event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        this.setState((prevState) => ({
            config: {
                ...prevState.config,
                [key]: value,
            },
        }));
    };

    handleSave = () => {
        const {config} = this.state;
        this.props.data.config = config; // 保存到原始 NodeData 中
        console.log("Updated config:", config);
    };

    getLabel = () => {
        const label = this.props.data.getLabel();
        console.log("getLabel", label);
        return label;
    }

    renderChildren = () => {
        const {config} = this.state;

        return (<Form layout="vertical">
            {Object.entries(config).map(([key, value]) => {
                    console.log(key, value);
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
            <Collapse
                collapsible="header"
                defaultActiveKey={['1']}
                items={[
                    {
                        key: this.props.data.id,
                        label: this.getLabel(),
                        children: this.renderChildren(),
                    },
                ]}
            />
        );
    }
}

export default Node;
