import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
function Login () {

    const [authData, setAuthData] = useState({
        username : '',
        password : '',
    });

    useEffect(() => {
        // maybe useful someday
    },[authData])

    const authenticate = ( ) => {
        console.log(authData)
    }

    const onAuthValuesChange = (changedValues: any, allValues: any) => {
        setAuthData(allValues)
    }

    return (
        <div className='login-container'>
            <div className='login-form-container'>
                <div className='login-form-logo-container'>
                    <img src='./wms-logo.png' alt="Logo" />
                </div>
                <div className='login-form-app-title-container'>
                    {process.env.REACT_APP_NAME} - {process.env.REACT_APP_WMS_VERSION}
                </div>
                <div className='login-form-main-container'>
                    <Form 
                        onFinish={authenticate}
                        onValuesChange={onAuthValuesChange}
                        initialValues={authData}
                    >
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;