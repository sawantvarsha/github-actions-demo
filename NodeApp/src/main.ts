import { loadManifest } from '@angular-architects/module-federation';
//Added parameter : true | Anubhav Goyal | Lazy Loading of Remote Entry Files. | 21-Jun-2024
loadManifest("/assets/mf.manifest.json",true) // Changed by Aditi D on 06-06-24
.catch(err => console.error(err))
.then(_ => import('./bootstrap'))
.catch(err => console.error(err));
