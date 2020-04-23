import Head from 'next/head';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';

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


const Index = () => (
  <div>
    <Layout>
      <h1 className="text-2xl text-gray-800 font-ligth">Clientes</h1>
    </Layout>
  </div>
)

export default Index