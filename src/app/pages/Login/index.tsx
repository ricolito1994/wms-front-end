import AuthService from 'services/AuthService';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, Spin } from 'antd';
import { AppContext } from 'context';
import { useDispatch } from 'react-redux';
import { setToken } from 'slice/AuthSlice';
import { userAsync } from 'slice/UserSlice'
import { AppDispatch } from 'store';
interface LoginCredentials {
    username : String,
    password : String
}
const Login = () => {
    const {setIsAuthenticated, setAccessToken} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<any>(false);
    const dispatch = useDispatch();
    const dispatchAsync = useDispatch<AppDispatch>();
    const authService = new AuthService('');
    const navigate = useNavigate();
    const [authData, setAuthData] = useState<LoginCredentials>({
        username: '',
        password: '',
    });

    useEffect(() => {
        // maybe useful someday
    },[authData])

    const authenticate = async ( ) => {
        try {
            setIsLoading(true)
            let auth = await authService.login(authData);
            setAccessToken(auth.access_token)
            dispatch(setToken(auth.access_token));
            dispatchAsync(userAsync(auth.access_token));
            setIsAuthenticated(true)
            navigate('/')
        } catch(e: any) {
            notification.error({
                message: 'Login Failed',
                description: e.response.data.error,
                placement: 'top',
            });
        } finally {
            setIsLoading(false)
        }
    }

    const onAuthValuesChange = (
        changedValues: any, 
        allValues: any
    ) => {
        setAuthData(allValues)
    }

    return (
        <Spin spinning={isLoading}>
        <div className='login-container'>
            <div className='login-form-container'  style={{marginTop:'5%'}}>
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
                            <Button type="primary" htmlType="submit" style={{'width':'100%'}}>
                                SIGN IN
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
        </Spin>
    )
}
export default Login;