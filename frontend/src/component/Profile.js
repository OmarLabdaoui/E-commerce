import { width } from '@mui/system';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { setHeaders, url } from '../features/api';

function Profile() {
    const params = useParams();
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        isAdmin: false,
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${url}/users/find/${params.id}`,
                    setHeaders()
                );

                setUser({ ...res.data, password: "" });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchUser();
    }, [params.id]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {

                const res = await axios.get(
                    `http://localhost:5000/api/orders/findd/${params.id}`,
                    setHeaders()
                );

                setOrder(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchOrder();
    }, [params.id]);
    console.log(order)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);
            const res = await axios.put(
                `${url}/users/${params.id}`,
                {
                    ...user,
                },
                setHeaders()
            );

            setUser({ ...res.data, password: "" });


            setUpdating(false);
        } catch (err) {
            console.log(err);
            setUpdating(false);

        }
    };

    return (
        <divwaraper style={{ display: "flex", justifyContent: "center", }}>
            <StyledProfile>
                <ProfileContainer>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h3>User Profile</h3>
                            {user.isAdmin ? (
                                <Admin>Admin</Admin>
                            ) : (
                                <Customer>Customer</Customer>
                            )}
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                value={user.password}
                                id="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            <button className="btn btn-primary mt-2">{updating ? "Updating" : "Update Profile"}</button>
                        </form>
                    )}
                </ProfileContainer>

            </StyledProfile >
            {order &&

                <StyledOrder>

                    <>
                        <OrdersContainer>


                            <h2>Order Details</h2>
                            {order?.map(ord => (
                                <div>
                                    {ord.delivery_status === "pending" ? (
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "30%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Pending</div>
                                            <div />
                                        </div>
                                    ) : ord.delivery_status === "dispatched" ? (
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "65%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Dispatch</div>
                                            <div />
                                        </div>
                                    ) : ord.delivery_status === "delivered" ? (
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "100%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Delevred</div>
                                            <div />
                                        </div>
                                    ) : (
                                        "error"
                                    )}

                                </div>
                            ))}

                            {order?.map(ord => (
                                <p>
                                    Delivery status:{" "}
                                    {ord.delivery_status === "pending" ? (
                                        <Pending>Pending</Pending>
                                    ) : ord.delivery_status === "dispatched" ? (
                                        <Dispatched>Dispatched</Dispatched>
                                    ) : ord.delivery_status === "delivered" ? (
                                        <Delivered>Delivered</Delivered>
                                    ) : (
                                        "error"
                                    )}
                                </p>
                            ))}


                            <h3>ordered Products</h3>
                            <Items>
                                {order?.map((ord, index) => (
                                    <Item key={index}>
                                        {ord.products?.map(product => (
                                            <>
                                                <span>{product.description}</span>
                                                <span>{product.quantity}</span>
                                                <span>
                                                    {"dh" + (product.amount_total / 100).toLocaleString()}
                                                </span>
                                            </>
                                        ))}

                                    </Item>
                                ))}
                            </Items>
                            {order?.map(ord => (
                                <div>
                                    <h3>Total Price</h3>
                                    <p>{"dh" + (ord.total / 100).toLocaleString()}</p>
                                </div>
                            ))}

                            <div>
                                {order?.map(ord => (
                                    <>
                                        <h3>Shipping Details</h3>
                                        <p>Customer: {ord.shipping?.name}</p>
                                        <p>City: {ord.shipping?.address.city}</p>
                                        <p>Email: {ord.shipping?.email}</p>
                                    </>
                                ))}



                            </div>
                        </OrdersContainer>
                    </>

                </StyledOrder>
            }

        </divwaraper >
    );
}

export default Profile
const StyledProfile = styled.div`
            margin: 3rem;

            `;
const divwaraper = styled.div`
            display: flex;

            `;

const ProfileContainer = styled.div`
           
            width: 300px
            height: auto;
            display: flex;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-radius: 5px;
            padding: 2rem;

            form {
                display: flex;
            flex-direction: column;
            align-items: flex-start;

            h3 {
                margin - bottom: 0.5rem;
    }

            label {
                margin - bottom: 0.2rem;
            color: gray;
    }
            input {
                margin - bottom: 1rem;
            outline: none;
            border: none;
            border-bottom: 1px solid gray;
    }
  }
            `;

const Admin = styled.div`
            color: rgb(253, 181, 40);
            background: rgb(253, 181, 40, 0.12);
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 14px;
            margin-bottom: 1rem;
            `;
const Customer = styled.div`
            color: rgb(38, 198, 249);
            background-color: rgb(38, 198, 249, 0.12);
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 14px;
            margin-bottom: 1rem;
            `;
const StyledOrder = styled.div`
            margin: 3rem;
            display: flex;
            

            h3 {
                margin: 1.5rem 0 0.5rem 0;
  }
            `;

const OrdersContainer = styled.div`
            max-width: 500px;
            width: 100%;
            height: auto;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-radius: 5px;
            padding: 2rem;
            `;

const Items = styled.div`
            span {
                margin - right: 1.5rem;
            &:first-child {
                font - weight: bold;
    }
  }
            `;

const Item = styled.li`
            margin-left: 0.5rem;
            margin-bottom: 0.5rem;
            `;

const Pending = styled.span`
            color: rgb(253, 181, 40);
            background: rgb(253, 181, 40, 0.12);
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 14px;
            `;
const Dispatched = styled.span`
            color: rgb(38, 198, 249);
            background-color: rgb(38, 198, 249, 0.12);
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 14px;
            `;

const Delivered = styled.span`
            color: rgb(102, 108, 255);
            background-color: rgba(102, 108, 255, 0.12);
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 14px;
            `;
