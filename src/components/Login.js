import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import Sign_img from './Sign_img';

const Login = () => {

    const  history = useNavigate();
    
    const [inpval,setInpval] = useState({
        email:"",
        password:""
    })

    const [data,setData] = useState([]);
    console.log(inpval);

    const getdata = (e)=>{
        //console.log(e.target.value);

        const {value,name} = e.target;
        //console.log(value,name);

        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })

    }

    const addData = (e)=>{
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");
        console.log(getuserArr);

        const {email,password} = inpval;

        if(email === ""){
            alert("Email field is requried")
        }else if(!email.includes("@")){
            alert("Please enter valid email")
        }else if(password === ""){
            alert("Password field is required")
        }else if(password.length < 5){
            alert("Pasword length greater then five")
        }else{
            if (getuserArr && getuserArr.length) {
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el,k)=>{
                    return el.email === email && el.password === password
                });

                if(userlogin.length === 0){
                    alert("Invalid Details")
                }else{
                    console.log("User login succesfully");

                    localStorage.setItem("user_login", JSON.stringify(getuserArr))

                    history("/details")
                }
            }
        }
    }
    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className='left_data mt-3 p-3' style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-8'>Sign IN</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                                <Form.Control type="email" name="email" onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-8" controlId="formBasicPassword">
                                <Form.Control type="password" name="password" onChange={getdata} placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" className='col-lg-8' onClick={addData} style={{ background: "rgb(67,185,127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span><NavLink to="/">Sign Up</NavLink></span></p>
                    </div>
                    <Sign_img />
                </section>
            </div>
        </>
    )
}

export default Login