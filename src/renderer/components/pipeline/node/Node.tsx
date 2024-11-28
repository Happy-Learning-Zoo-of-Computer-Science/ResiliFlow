import React, { Component, ChangeEvent } from "react";
import {Input, Form, Card, Collapse} from "antd";

interface NodeProps {
    data: NodeData;
}

interface NodeState {
    config: Record<string, any>;
}

class Node extends Component<NodeProps, NodeState> {
    constructor(props: NodeProps) {
        super(props);
        this.state = {
            config: { ...props.data.config },
        };
    }

    handleInputChange = (key: string, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            config: {
                ...prevState.config,
                [key]: value,
            },
        }));
    };

    handleSave = () => {
        const { config } = this.state;
        this.props.data.config = config; // 保存到原始 NodeData 中
        console.log("Updated config:", config);
    };

    getLabel = () => {
        return this.props.data.label;
    }

    renderChildren = () => {
        const { config } = this.state;

        return (<Form layout="vertical">
            {Object.entries(config).map(([key, value]) => (
                <Form.Item key={key} label={key}>
                    <Input
                        value={value}
                        onChange={(event) => this.handleInputChange(key, event)}
                    />
                </Form.Item>
            ))}
        </Form>)
    }

    render() {
        return (
            <Collapse
                collapsible="header"
                defaultActiveKey={['1']}
                items={[
                    {
                        key: '1',
                        label: this.getLabel(),
                        children: this.renderChildren(),
                    },
                ]}
            />
        );
    }
}

export default Node;
