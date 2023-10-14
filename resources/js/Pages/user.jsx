import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import { Link } from '@inertiajs/react'
import swal from "sweetalert";
import { usePage } from '@inertiajs/react'
import { router } from "@inertiajs/react";

function user({users}) {
    const { auth } = usePage().props
    console.log(auth)
    const handleDelete = (id) => {
        swal( {
            title : "Apaka yakin ingin menghapus ",
            text : "Data yang dihapus tidak akan dapat dikembalikan",
            icon : "warning",
            buttons: true,
            dangerMode : true,
          })
          .then((willDelete) => {
            if(willDelete){
                router.delete(route('user.destroy', id), {
                      onSuccess : () => {
                        swal("Alhamdulillah Data Terhapus")
                      },
                })
            }
          });
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Daftar Pengguna ( {auth.user.name})</title>
            </Helmet>
            <div>
            <Link href={route('user.create')}>
                Create User
            </Link>
            <div className="m-5 overflow-hidden border border-gray-200 rounded-lg shadow-md">
                <table className="w-full text-sm text-left text-gray-500 bg-white border-collapse">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                        ID
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                        Nama
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                        Email
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
                    </tr>
                    </thead>
                    <tbody className="border-t border-gray-100 divide-y divide-gray-100">
                    {users.map((user,index) => (
                    <tr className="hover:bg-gray-50" key={user.id}>
                        <td className="px-6 py-4" > {index+1}</td>
                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                            <div className="font-medium text-gray-700">{user.name}</div>
                        </div>
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                        <div className="flex justify-end gap-4">
                            <div onClick={handleDelete.bind(this, user.id)}>
                            <a x-data="{ tooltip: 'Delete' }" href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                                x-tooltip="tooltip"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                            </a>
                            </div>
                            <Link href={route('user.edit',user.id)}>
                            <div x-data="{ tooltip: 'Edite' }" href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                                x-tooltip="tooltip"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                            </svg>
                            </div>
                            </Link>
                        </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>

        </React.Fragment>
  )
}

user.layout = page => <Layout children={page}/>
export default user
