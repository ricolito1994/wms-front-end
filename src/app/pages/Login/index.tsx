import AuthService from 'services/AuthService';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { AppContext } from 'context';
import { useDispatch } from 'react-redux';
import { setToken } from 'slice/AuthSlice';
import { userAsync } from 'slice/UserSlice'
import { AppDispatch } from 'store';
const Login = () => {
    const {setIsAuthenticated, setAccessToken} = useContext(AppContext);
    const dispatch = useDispatch();
    const dispatchAsync = useDispatch<AppDispatch>();
    const authService = new AuthService('');
    const navigate = useNavigate();
    const [authData, setAuthData] = useState({
        username : '',
        password : '',
    });

    useEffect(() => {
        // maybe useful someday
    },[authData])

    const authenticate = async ( ) => {
        try {
            let auth = await authService.login(authData);
            setAccessToken(auth.access_token)
            dispatch(setToken(auth.access_token));
            dispatchAsync(userAsync(auth.access_token));
            setIsAuthenticated(true)
            navigate('/')
        } catch(e) {
            console.log(e)
        }
    }

    const onAuthValuesChange = (
        changedValues: any, 
        allValues: any
    ) => {
        setAuthData(allValues)
    }

    return (
        <div className='login-container'>
            <div className='login-form-container'>
                <div className='login-form-logo-container'>
                    <img src={`${process.env.PUBLIC_URL}/wms-logo.png?${new Date().getTime()}`} alt="Logo" />
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