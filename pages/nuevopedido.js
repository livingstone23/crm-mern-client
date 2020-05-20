import React, { useContext, } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';

//Context de pedido
import PedidoContext from '../context/pedidos/PedidoContext';


const NuevoPedido = () => {

    //Utilizar context y exportar sus funciones y valores
    const pedidosContext = useContext(PedidoContext);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>
            <AsignarCliente />
            <AsignarProductos />
            
        </Layout>

        
    );
};



export default NuevoPedido;