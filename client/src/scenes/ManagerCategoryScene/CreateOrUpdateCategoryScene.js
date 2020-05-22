import React, {useState} from 'react';
import {Card, Form, Input, Button, Checkbox} from "antd";
import API, {createCategory} from "../../services/api/API";
import Auth from "../../services/api/Auth";

const layout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24},
};
const tailLayout = {
    wrapperCol: {offset: 12, span: 12},
};

const CreateOrUpdateCategoryScene = (props) => {
    console.log(props.location.pathname.split('/')[2]);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = Auth.isAuthenticated();
    console.log(token)

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };



    const onFinish = value => {
        setError("");
        setSuccess(false);
        // make request to api to create category
        API.createCategory(token, {name}).then(data => {
            console.log(data)
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name Category"
                    name="name"
                    onChange={handleChange}
                    rules={[{required: true, message: 'Please input your name category!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
};

export default CreateOrUpdateCategoryScene;
