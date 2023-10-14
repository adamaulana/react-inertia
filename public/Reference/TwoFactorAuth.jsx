import React from "react";

import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { styles } from "../styles";
import { InertiaLink } from "@inertiajs/inertia-react";


const TwoFactorAuth = () => {
   
  
   
    return (
        <div>
            <Helmet>
                <title>Two Factor auth</title>
            </Helmet>

           <div>
               Your Two actor Authentocatoin : enable 
           </div>
            <div className="flex flex-col justify-center mt-10 mb-4">
                <div className="items-center">
                   {/* for qrcode */}
                </div>
                <div className="items-center">
                    
                    
                </div>
            </div>
            <InertiaLink
                    className={styles.classNameButton("bg-green-400")}
                    href="/user/two-factor-authentication"
                    method="post"
                    as="button"
                    type="button"
                >
                    Enable
                </InertiaLink>
                <InertiaLink
                    className={styles.classNameButton("bg-red-400")}
                    href="/user/two-factor-authentication"
                    method="delete"
                    as="button"
                    type="button"
                >
                    Disable
                </InertiaLink>
            

            
        </div>
    );
};
TwoFactorAuth.layout = (page) => (
    <Layout user={page.props.user} children={page} />
);
export default TwoFactorAuth;
