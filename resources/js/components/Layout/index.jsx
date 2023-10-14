import React from 'react'
import { router } from '@inertiajs/react'
import NProgress from 'nprogress'
import Sidebar from '../Sidebar'

const Layout =  ({children}) =>  {
  router.on('start', () => NProgress.start())
  return (
    <React.Fragment>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
        <div className='flex'>
            <div className='w-1/6 h-screen bg-purple-500'>
                <Sidebar/>
            </div>
            <div className='w-5/6 p-4'>
                {children}
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout
