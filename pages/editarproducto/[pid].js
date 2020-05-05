import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id){
            id
            nombre
            existencia
            precio
        }
    }
`;

const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput) {
        actualizarProducto(id: $id, input: $input) {
            id
            nombre
            precio
            existencia
    }
    }
`;


const EditarProducto = () => {

    //obtener el ID actual
    const router = useRouter();
    const { query: { id } } = router;


    //Consultar para obtener el cliente
    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, { 
        variables: {
            id
        }
    });

    //Actualizar el producto
    const [ actualizarProducto ] = useMutation( ACTUALIZAR_PRODUCTO );

    //Schema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
            .required('El nombre del producto es requerido'),
        
        existencia: Yup.number()
            .required('Agrega la cantidad disponible')
            .positive('No se aceptan numeros negativos')
            .integer('La Existencia debe ser números entereos'),

        precio: Yup.number()
            .required('El campo empresa es obligatorio')
            .positive('No se aceptan numeros negativos')

    });

    if (loading ) return 'Cargando ...';


    if(!data) {
        return 'Acción no permitida';
    }

    const { obtenerProducto } = data;

    // Modifica el producto en la base de datos
    const actualizarInfoProducto =  async valores => {
        const { nombre, existencia, precio } = valores;

        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencia,
                        precio
                    }
                }
            });
            
            //TODO SWEET ALERT
            Swal.fire(
                'Actualizado!',
                'El Producto se actualizó correctamente',
                'success'
                );


            //Redireccionamos
            router.push('/productos');

        } catch (error) {
            console.log(error);
        }
    }; 


 

    return (
         <Layout>
            <h1 className="text-2xl text-gray-800 font-ligth">Edición Producto</h1>


            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema= { schemaValidacion }
                        enableReinitialize
                        initialValues = { obtenerProducto }
                        onSubmit={( valores ) => {
                            actualizarInfoProducto( valores )

                        }}
                    >
                        {props => {
                           
                            return (

                                <form 
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Producto
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="nombre"
                                            type="text"
                                            placeholder="Nombre Producto"
                                            value={props.values.nombre}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    { props.touched.nombre && props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                                    ) : null  }

                                    
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                            Existencia
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="existencia"
                                            type="number"
                                            placeholder="Cantidad de Productos"
                                            value={props.values.existencia}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {  props.touched.existencia && props.errors.existencia ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.existencia}</p>
                                        </div>
                                    ) : null }

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                            Precio
                                        </label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="precio"
                                            type="number"
                                            placeholder="Precio"
                                            value={props.values.precio}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    { props.touched.precio && props.errors.precio ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div>
                                    ) : null }


                                    <input 
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hove:bg-gray-900"
                                        value="Actualizar Información"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};

export default EditarProducto;


