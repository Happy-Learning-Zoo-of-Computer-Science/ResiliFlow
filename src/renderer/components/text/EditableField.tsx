import React, { useState } from "react";
import { Input, Button, Typography, Space } from "antd";

const { Text } = Typography;

interface EditableFieldProps {
    inputWidth: number;
    initialValue: string;
    onSave: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({inputWidth, initialValue, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        onSave(value);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setValue(initialValue);
        setIsEditing(false);
    };

    return (
        <Space>
            {isEditing ? (
                <>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{ width: inputWidth }}
                    />
                    <Button type="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </>
            ) : (
                <>
                    <Text>{value}</Text>
                    <Button type="link" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                </>
            )}
        </Space>
    );
};

export default EditableField;
