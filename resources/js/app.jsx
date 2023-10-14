import React from 'react'
import route from 'ziggy-js';
import { Ziggy } from './ziggy';
import {createRoot} from 'react-dom/client' //here
import {createInertiaApp } from '@inertiajs/react'
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers'

// route('home', undefined, undefined, Ziggy);
// createInertiaApp({
//     resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`,import.meta.glob('./Pages/**/*.jsx')),
//     setup({ el, App, props }) {
//         createRoot(el).render(<App {...props} />) //and here
//     },
// })


createInertiaApp({
    resolve: name => {
      const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
      return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
      createRoot(el).render(<App {...props} />)
    },
    progress : {
        delay: 250,

        // The color of the progress bar...
        color: '#3498db',

        // Whether to include the default NProgress styles...
        includeCSS: true,

        // Whether the NProgress spinner will be shown...
        showSpinner: true,
    }
  })
