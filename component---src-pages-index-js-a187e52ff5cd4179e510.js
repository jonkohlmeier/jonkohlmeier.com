/*! For license information please see component---src-pages-index-js-a187e52ff5cd4179e510.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{RXBc:function(e,t,a){"use strict";a.r(t);var r=a("q1tI"),n=a.n(r),l=(a("q4sD"),a("Wbzz")),s=a("9eSz"),o=a.n(s),i=a("wx14"),c=a("zLVn"),u=a("TSYQ"),f=a.n(u),d=n.a.createContext({});d.Consumer,d.Provider;function m(e,t){var a=Object(r.useContext)(d);return e||a[t]||t}var p=n.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.fluid,l=e.as,s=void 0===l?"div":l,o=e.className,u=Object(c.a)(e,["bsPrefix","fluid","as","className"]),d=m(a,"container"),p="string"==typeof r?"-"+r:"-fluid";return n.a.createElement(s,Object(i.a)({ref:t},u,{className:f()(o,r?""+d+p:d)}))}));p.displayName="Container",p.defaultProps={fluid:!1};var v=p,h=["xl","lg","md","sm","xs"],b=n.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.noGutters,s=e.as,o=void 0===s?"div":s,u=Object(c.a)(e,["bsPrefix","className","noGutters","as"]),d=m(a,"row"),p=d+"-cols",v=[];return h.forEach((function(e){var t,a=u[e];delete u[e];var r="xs"!==e?"-"+e:"";null!=(t=null!=a&&"object"==typeof a?a.cols:a)&&v.push(""+p+r+"-"+t)})),n.a.createElement(o,Object(i.a)({ref:t},u,{className:f.a.apply(void 0,[r,d,l&&"no-gutters"].concat(v))}))}));b.displayName="Row",b.defaultProps={noGutters:!1};var g=b,y=["xl","lg","md","sm","xs"],E=n.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.as,s=void 0===l?"div":l,o=Object(c.a)(e,["bsPrefix","className","as"]),u=m(a,"col"),d=[],p=[];return y.forEach((function(e){var t,a,r,n=o[e];if(delete o[e],"object"==typeof n&&null!=n){var l=n.span;t=void 0===l||l,a=n.offset,r=n.order}else t=n;var s="xs"!==e?"-"+e:"";t&&d.push(!0===t?""+u+s:""+u+s+"-"+t),null!=r&&p.push("order"+s+"-"+r),null!=a&&p.push("offset"+s+"-"+a)})),d.length||d.push(u),n.a.createElement(s,Object(i.a)({},o,{ref:t,className:f.a.apply(void 0,[r].concat(d,p))}))}));E.displayName="Col";var x=E,w=a("Bl7J"),j=a("vrFN");t.default=function(e){var t,a=e.data,r=e.location,s=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",i=a.allMarkdownRemark.nodes;return 0===i.length?n.a.createElement(w.a,{location:r,title:s},n.a.createElement(j.a,{title:"All posts"}),n.a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):n.a.createElement(w.a,{location:r,title:s},n.a.createElement(j.a,{title:"All posts"}),n.a.createElement(v,{fluid:!0},n.a.createElement(g,null,i.map((function(e){var t=e.frontmatter.title||e.fields.slug;return n.a.createElement(x,{lg:4,md:4,sm:12},n.a.createElement("div",{key:e.fields.slug},n.a.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.a.createElement("header",null,n.a.createElement("h2",null,n.a.createElement(l.Link,{to:e.fields.slug,itemProp:"url"},n.a.createElement(o.a,{sizes:e.frontmatter.headerImage.childImageSharp.sizes}),n.a.createElement("span",{itemProp:"headline"},t))),n.a.createElement("small",null,e.frontmatter.date)),n.a.createElement("section",null,n.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"})))))})))))}},TSYQ:function(e,t,a){var r;!function(){"use strict";var a={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var l=typeof r;if("string"===l||"number"===l)e.push(r);else if(Array.isArray(r)&&r.length){var s=n.apply(null,r);s&&e.push(s)}else if("object"===l)for(var o in r)a.call(r,o)&&r[o]&&e.push(o)}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()},q4sD:function(e,t,a){},wx14:function(e,t,a){"use strict";function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}a.d(t,"a",(function(){return r}))},zLVn:function(e,t,a){"use strict";function r(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}a.d(t,"a",(function(){return r}))}}]);
//# sourceMappingURL=component---src-pages-index-js-a187e52ff5cd4179e510.js.map