import './Register.css'
import { ConfigProvider , Button , Input, Form , message, Select, DatePicker} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GenderUserInterface, PrefixUserInterface, UserForRegInterface } from '../../../interface/login';
import { CreateUser, GetGenders, GetPrefix } from '../../../service/login';

const { Option } = Select;

export default function Register(){
    const navigate = useNavigate();
    const [genders, setGenders] = useState<GenderUserInterface[]>([]);
    const [prefix, setPrefix] = useState<PrefixUserInterface[]>([]);
    const onFinish = async (values: UserForRegInterface) => {
        values.StatusUserID = 2;
        let res = await CreateUser(values);
        if (res.status){
            message.success("สมัครเสร็จสิ้น โปรดล็อกอินอีกครั้ง");
            setTimeout(function () {
                navigate("/login");
            }, 2000);
        }
    }
    function onClickLogin(){
        navigate("/login");
    }
    const getGender = async () => {
        let res = await GetGenders();
        if (res) {
          setGenders(res);
        }
    };
    const getPrefix = async () => {
        let res = await GetPrefix();
        if (res) {
          setPrefix(res);
        }
    };
    useEffect(() => {
        getGender();
        getPrefix();
    }, []);

    return(
        <ConfigProvider theme={{
            components:{
                Button:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                    primaryColor: '#000000',
                },
                Input:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                },
                Select:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                },
                DatePicker:{
                    colorPrimary: '#F5CE00',
                    algorithm: true,
                }
            },
        }}>
        <div className='web-reg'>
            <div className='body-reg'>
                <div className='body-reg-text'>สร้างบัญชีผู้ใช้งาน</div>
                <Form onFinish={onFinish}>
                    <div className='reg-name'>
                        <div className='reg-prefix'>
                            <Form.Item name="PrefixID" rules={[{required: true,message: "กรุณาใส่คำนำหน้า"}]} >
                                <Select style={{height:40,fontSize:20,fontFamily:'Mitr'}} placeholder='คำนำหน้า' allowClear>
                                    {prefix.map((item) => (<Option value={item.ID} key={item.Prefix}>{item.Prefix}</Option>))}             
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='reg-firstname' >
                            <Form.Item name="Firstname" rules={[{required: true,message: "กรุณากรอกชื่อ"}]}>
                                <Input style={{height:50,fontSize:20,fontFamily:'Mitr'}} placeholder='ชื่อจริง'></Input>
                            </Form.Item>
                            </div>
                            <div className='reg-lastname'>
                            <Form.Item name="Lastname" rules={[{required: true,message: "กรุณากรอกนามสกุล"}]}>
                                <Input style={{height:50,fontSize:20,fontFamily:'Mitr'}} placeholder='นามสกุล'></Input>
                            </Form.Item>
                            </div>
                    </div>
                    <div className='reg-username'>
                        <Form.Item name="Username" rules={[{required: true,message: "กรุณากรอกชื่อผู้ใช้"}]}>
                            <Input style={{height:50,fontSize:20,fontFamily:'Mitr'}} placeholder='ชื่อผู้ใช้งาน'></Input>
                        </Form.Item>
                    </div>
                    <div className='reg-email'>
                        <Form.Item name="Email" rules={[{required: true,message: "กรุณากรอกอีเมล"}]}>
                            <Input style={{height:50,fontSize:20,fontFamily:'Mitr'}} placeholder='อีเมล'></Input>
                        </Form.Item>
                    </div>
                    <div className='reg-layout01'>
                        <div className='reg-gender'>
                            <Form.Item name="GenderID" rules={[{required: true,message: "กรุณาใส่เพศ"}]}>
                                <Select style={{height:50,fontSize:20,fontFamily:'Mitr'}} placeholder='เพศ' allowClear>
                                {genders.map((item) => (<Option value={item.ID} key={item.Gender}>{item.Gender}</Option>))} 
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='reg-dob'>
                            <Form.Item name="Dob" rules={[{required: true,message: "กรุณากรอกวันเกิด"}]}>
                                <DatePicker style={{width:"120%",height:50,fontSize:20,fontFamily:'Mitr'}} placeholder='วันเกิด'></DatePicker>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='reg-password'>
                        <Form.Item name="Password" hasFeedback rules={[{required:true, message:"โปรดใส่รหัสผ่าน"}]}>
                            <Input style={{height:53,fontSize:25,fontFamily:'Mitr'}} placeholder='รหัสผ่าน' type='password'></Input>
                        </Form.Item>
                    </div>
                    <div className='reg-confirm'>
                    <Form.Item name="confirm" dependencies={['Password']} rules={[
                            {
                                required:true,
                                message:"โปรดยืนยันรหัสผ่าน",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                                },
                              }),
                            
                            ]}>
                            <Input style={{height:53,fontSize:25,fontFamily:'Mitr'}} placeholder='ยืนยันรหัสผ่าน' type='password'></Input>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} type='primary' htmlType='submit'>สร้างบัญชี</Button>
                    </Form.Item>
                </Form>
            </div>
        <div className='reg-back-button'><Button style={{fontSize: 25,width: 200,height:50,fontFamily:'Mitr'}} type='primary' onClick={onClickLogin}>ล็อกอิน</Button></div>
        </div>
        </ConfigProvider>
        
    );
}