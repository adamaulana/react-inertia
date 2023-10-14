import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

const profile = () => {
  return (
    <React.Fragment>
        <Helmet>
            <title>Profil</title>
        </Helmet>
        <div>
            <h1>Ini adalah halaman profile</h1>
        </div>
    </React.Fragment>
  )
}

profile.layout = page => <Layout children={page}/>
export default profile
