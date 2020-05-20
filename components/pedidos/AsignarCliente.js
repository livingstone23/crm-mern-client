import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClienteVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

const AsignarCliente = () => {

    const [cliente, setCliente ] = useState([]);

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);

    const { agregarCliente } = pedidoContext;

    //Consultar la base de datos
    const {data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

    

    useEffect(() => {
        agregarCliente(cliente);
    }, [cliente]);

    const seleccionarCliente  = clientes => {
        setCliente(clientes);
    }


    //Resultado de la consulta
    if(loading) return null;

    //Resultado de la consulta
    if(loading) return null;

    const {obtenerClienteVendedor } = data;

    return (

        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
            <Select 
                className="mt-3"
                options= { obtenerClienteVendedor }
                //isMulti= { true }
                onChange={ opcion => seleccionarCliente(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => opciones.nombre}
                placeholder="Busque o Seleccione el cliente"
                noOptionsMessage={() => "No hay resultados"}

            
            />
        </>
    );
};

export default AsignarCliente;