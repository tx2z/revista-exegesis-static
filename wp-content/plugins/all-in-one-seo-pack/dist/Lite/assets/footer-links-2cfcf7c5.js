import{_ as n}from"./js/_plugin-vue_export-helper.bd508f36.js";import{o as r,c as s,a as e,r as _,t as a,e as l,E as m}from"./js/vue.runtime.esm-bundler.a49acf4f.js";import{l as g}from"./js/index.68062296.js";import{u as k}from"./js/links.96235554.js";import"./js/translations.93cb7f26.js";import"./js/default-i18n.cc9dbff0.js";import"./js/constants.c7984802.js";import"./js/isArrayLikeObject.3ade28da.js";const v={},$={class:"aioseo-facebook"},b=e("path",{fill:"currentColor",d:"M16 8.05A8.02 8.02 0 0 0 8 0C3.58 0 0 3.6 0 8.05A8 8 0 0 0 6.74 16v-5.61H4.71V8.05h2.03V6.3c0-2.02 1.2-3.15 3-3.15.9 0 1.8.16 1.8.16v1.98h-1c-1 0-1.31.62-1.31 1.27v1.49h2.22l-.35 2.34H9.23V16A8.02 8.02 0 0 0 16 8.05Z"},null,-1),y=[b];function C(t,c){return r(),s("svg",$,y)}const V=n(v,[["render",C]]),S={},A={class:"aioseo-linkedin"},L=e("path",{fill:"currentColor",d:"M14 1H1.97C1.44 1 1 1.47 1 2.03V14c0 .56.44 1 .97 1H14a1 1 0 0 0 1-1V2.03C15 1.47 14.53 1 14 1ZM5.22 13H3.16V6.34h2.06V13ZM4.19 5.4a1.2 1.2 0 0 1-1.22-1.18C2.97 3.56 3.5 3 4.19 3c.65 0 1.18.56 1.18 1.22 0 .66-.53 1.19-1.18 1.19ZM13 13h-2.1V9.75C10.9 9 10.9 8 9.85 8c-1.1 0-1.25.84-1.25 1.72V13H6.53V6.34H8.5v.91h.03a2.2 2.2 0 0 1 1.97-1.1c2.1 0 2.5 1.41 2.5 3.2V13Z"},null,-1),x=[L];function U(t,c){return r(),s("svg",A,x)}const M=n(S,[["render",U]]),Z={},H={class:"aioseo-twitter"},w=e("path",{fill:"currentColor",d:"M15.27 4.43A7.4 7.4 0 0 0 17 2.63c-.6.27-1.3.47-2 .53a3.41 3.41 0 0 0 1.53-1.93c-.66.4-1.43.7-2.2.87a3.5 3.5 0 0 0-5.96 3.2 10.14 10.14 0 0 1-7.2-3.67C.86 2.13.7 2.73.7 3.4c0 1.2.6 2.26 1.56 2.89a3.68 3.68 0 0 1-1.6-.43v.03c0 1.7 1.2 3.1 2.8 3.43-.27.06-.6.13-.9.13a3.7 3.7 0 0 1-.66-.07 3.48 3.48 0 0 0 3.26 2.43A7.05 7.05 0 0 1 0 13.24a9.73 9.73 0 0 0 5.36 1.57c6.42 0 9.91-5.3 9.91-9.92v-.46Z"},null,-1),B=[w];function P(t,c){return r(),s("svg",H,B)}const E=n(Z,[["render",P]]),F={},T={class:"aioseo-youtube"},D=e("path",{fill:"currentColor",d:"M16.63 3.9a2.12 2.12 0 0 0-1.5-1.52C13.8 2 8.53 2 8.53 2s-5.32 0-6.66.38c-.71.18-1.3.78-1.49 1.53C0 5.2 0 8.03 0 8.03s0 2.78.37 4.13c.19.75.78 1.3 1.5 1.5C3.2 14 8.51 14 8.51 14s5.28 0 6.62-.34c.71-.2 1.3-.75 1.49-1.5.37-1.35.37-4.13.37-4.13s0-2.81-.37-4.12Zm-9.85 6.66V5.5l4.4 2.53-4.4 2.53Z"},null,-1),I=[D];function N(t,c){return r(),s("svg",T,I)}const O=n(F,[["render",N]]);const R={setup(){return{rootStore:k()}},components:{FacebookSvg:V,LinkedInSvg:M,TwitterSvg:E,YouTubeSvg:O},data(){return{strings:{madeBy:this.$t.__("Made with ♥ by the AIOSEO Team",this.$td),support:this.$t.__("Support",this.$td),docs:this.$t.__("Docs",this.$td),freePlugins:this.$t.__("Free Plugins",this.$td)}}},methods:{getUtmLink(t){return this.$links.utmUrl("footer",this.rootStore.aioseo.page,t)}}},q={class:"aioseo-footer"},Y=["href"],j=e("span",null,"/",-1),z=["href"],G=e("span",null,"/",-1),J=["href"],K=["href"],Q=["href"],W=["href"],X=["href"];function ee(t,c,ne,u,i,o){const h=_("facebook-svg"),p=_("linked-in-svg"),f=_("twitter-svg"),d=_("you-tube-svg");return r(),s("div",q,[e("div",null,a(i.strings.madeBy),1),e("div",null,[e("a",{href:o.getUtmLink("https://aioseo.com/plugin/lite-support"),target:"_blank",rel:"noreferrer noopener"},a(i.strings.support),9,Y),j,e("a",{href:o.getUtmLink("https://aioseo.com/docs/"),target:"_blank",rel:"noreferrer noopener"},a(i.strings.docs),9,z),G,e("a",{href:u.rootStore.aioseo.urls.aio.about,rel:"noreferrer noopener"},a(i.strings.freePlugins),9,J)]),e("div",null,[e("a",{href:o.getUtmLink("https://aioseo.com/plugin/facebook"),target:"_blank",rel:"noreferrer noopener"},[l(h)],8,K),e("a",{href:o.getUtmLink("https://aioseo.com/plugin/linkedin"),target:"_blank",rel:"noreferrer noopener"},[l(p)],8,Q),e("a",{href:o.getUtmLink("https://aioseo.com/plugin/twitter"),target:"_blank",rel:"noreferrer noopener"},[l(f)],8,W),e("a",{href:o.getUtmLink("https://aioseo.com/plugin/youtube"),target:"_blank",rel:"noreferrer noopener"},[l(d)],8,X)])])}const te=n(R,[["render",ee]]),oe=document.querySelector("#aioseo-footer-links");if(oe){let t=m({...te,name:"Standalone/FooterLinks"});t=g(t),t.mount("#aioseo-footer-links")}
