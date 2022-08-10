import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectProduct } from '../features/productsSlice';
import { setHeaders, url } from "../features/api";
import axios from 'axios';
function AllTimeData() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [earning, setEarnings] = useState([]);
  const { items: data, status } = useSelector((state) => state.products);
  console.log(orders.map(order => (order.total)))
  let OderserNumber = orders.map(order => (order.total))
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/`, setHeaders());


        setUsers(res.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/`, setHeaders());


        setOrders(res.data);

      } catch (err) {
        console.log(err.response.data);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income`, setHeaders());


        setEarnings(res.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <Main >
      <h3>All Times</h3>
      <Info>
        <Title>Users</Title>
        <Data>{users.length}</Data>
      </Info>
      <Info>
        <Title>Products</Title>
        <Data>{data.length}</Data>
      </Info>
      <Info>
        <Title>Orders</Title>
        <Data>{orders.length}</Data>
      </Info>
      <Info>
        <Title>Earnings</Title>
        <Data>{earning[0]?.total / 100}DH</Data>
      </Info>
    </Main >
  )
}

export default AllTimeData;
const Main = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);

  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
const Title = styled.div`
  flex: 1;
`;
const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
