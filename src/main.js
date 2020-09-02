/* polyfills */

import './globals/polyfills/find.js';
import './globals/polyfills/findIndex.js';

/* globals */

import 'normalize.css';
import './globals/fonts.css'; 
import './globals/global.css';

const scripts = {};

function importAllScripts(context) {
    context.keys().forEach(key => scripts[key] = context(key));
}

function importAllStyles(context) {
    context.keys().forEach(key => context(key));
}

function loadAllScripts(scripts) {
    for (let key in scripts) {
        if (scripts[key].default) {
            scripts[key].default();
        }
    }
}

importAllStyles(require.context('./components/', true, /^\.\/.*\.css$/));
importAllScripts(require.context('./components/', true, /^\.\/.*\.js$/));
loadAllScripts(scripts);