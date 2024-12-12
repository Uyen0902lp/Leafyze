import React from 'react';
import Wrapper from '@/layouts/wrapper';
import Footer from '@/layouts/footer/footer';
import { getOrderById } from '@/api/get-order';
import { IDBResponseDT } from '@/types/db-response-dt';
import { IOrderResponse } from '@/types/order-d-t';
import OrderArea from '@/components/order/order-area';
import Header from '@/layouts/header/header';

export default async function OrderPage({params}: {params:{id:string} }) {
  const order:IDBResponseDT<IOrderResponse> = await getOrderById(params.id);
  return (
    <Wrapper> 

      {/* header area */}
      <Header/>
      {/* header area */}

      <main>

        {/* order area */}
        <OrderArea order={order.data} />
        {/* order area */}

      </main> 

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  )
}
