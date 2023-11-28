/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { fetchUser, fetchOrder, fetchPackage } from 'src/services/UserService';

import AppOrderTimeline from '../app-order-timeline';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [countOrder1, setCountOrder1] = useState(0);
  const [countOrder2, setCountOrder2] = useState(0);
  const [countOrder3, setCountOrder3] = useState(0);

  useEffect(() => {
    getUser(1);
    getOrder();
    getPackage();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUser(1);
      getOrder();
      getPackage();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [orderInfo]);

  const updateOrderInfo = (newOrderInfo) => {
    setOrderInfo(newOrderInfo);
  };

  const getUser = async (page) => {
    try {
      const res = await fetchUser(page);
      if (res && res.data) {
        const xPaginationHeader = res.headers?.['x-pagination'];
        if (xPaginationHeader) {
          const paginationData = JSON.parse(xPaginationHeader);
          const countUser = paginationData.TotalCount;
          setTotalUser(countUser);
        }
        // setListUser(res.data);
      }
    } catch (error) {
      console.log('Error Getting User', error);
    }
  };

  const getOrder = async () => {
    try {
      const res = await fetchOrder();
      if (res && res.data) {
        const xPaginationHeader = res.headers?.['x-pagination'];
        if (xPaginationHeader) {
          const paginationData = JSON.parse(xPaginationHeader);
          const countOrder = paginationData.TotalCount;
          setTotalOrder(countOrder);
        }
        const filteredOrders = res.data.filter((order) => order.transactionNo !== null);
        const totalPrice = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        setOrderPrice(totalPrice);
        setOrderInfo(filteredOrders);
        const filteredOrdersName1 = orderInfo.filter((orderName) =>
          orderName.package.name.includes('Gói thông thường')
        );

        const filteredOrdersName2 = orderInfo.filter((orderName) =>
          orderName.package.name.includes('Gói VIP')
        );

        const filteredOrdersName3 = orderInfo.filter((orderName) =>
          orderName.package.name.includes('Gói Dịch Vụ Trọn Gói - Premium')
        );
        setCountOrder1(filteredOrdersName1.length);
        setCountOrder2(filteredOrdersName2.length);
        setCountOrder3(filteredOrdersName3.length);
        updateOrderInfo(filteredOrders);
      }
    } catch (error) {
      console.log('Error Getting User', error);
    }
  };

  const getPackage = async () => {
    try {
      const res = await fetchPackage();
    } catch (error) {
      console.log('Error Getting Package', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Doanh Thu"
            total={orderPrice}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Người dùng"
            total={totalUser}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Đơn hàng"
            total={totalOrder}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Tỉ lệ sử dụng gói"
            chart={{
              labels: [
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
              ],
              series: [
                {
                  name: 'Gói dịch vụ thường',
                  type: 'column',
                  fill: 'solid',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, countOrder1],
                },
                {
                  name: 'Gói Vip',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, countOrder2],
                },
                {
                  name: 'Gói Dịch Vụ Trọn Gói - Premium',
                  type: 'line',
                  fill: 'solid',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, countOrder3],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={orderInfo
              .slice(0, 5) // Get the latest 5 orders
              .map((order) => ({
                id: order.id,
                title: `Order #${order.package.name}`,
                type: `order${order.orderDate}`,
                time: order.paymentDate,
              }))}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
