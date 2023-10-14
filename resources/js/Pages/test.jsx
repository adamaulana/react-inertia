import React, {useState} from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';

function test() {
  return (
        <div>
            <Helmet>
                <title>Test Page</title>
            </Helmet>
            <h1>Test Inertia</h1>
        </div>

  )
}

test.layout = page => <Layout children={page}/>
export default test
