import{S as ee,i as te,s as ae,k as n,l as c,m as i,h as r,n as d,b as se,B as P,o as re,q as w,a as q,w as oe,r as x,c as V,x as ne,G as e,y as ce,f as ie,t as le,z as de}from"../../../../chunks/index-aaee736c.js";function he(h){let t;return{c(){t=n("div"),this.h()},l(s){t=c(s,"DIV",{id:!0,class:!0}),i(t).forEach(r),this.h()},h(){d(t,"id","qrcode"),d(t,"class","svelte-1brhcse")},m(s,a){se(s,t,a)},p:P,i:P,o:P,d(s){s&&r(t)}}}function ue(h,t,s){let{codeValue:a}=t,{squareSize:l}=t;return re(()=>{const o=document.createElement("script");o.src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js",document.head.append(o),o.onload=function(){new QRCode("qrcode",{text:a,width:l,height:l,colorDark:"#006DAE",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H})}}),h.$$set=o=>{"codeValue"in o&&s(0,a=o.codeValue),"squareSize"in o&&s(1,l=o.squareSize)},[a,l]}class fe extends ee{constructor(t){super(),te(this,t,ue,he,ae,{codeValue:0,squareSize:1})}}function me(h){let t,s,a,l,o,g,E,Q,R,S,L,A,f,b,v,M,m,C,N,$,_,D,B,G,y,O,T,I;return v=new fe({props:{codeValue:h[1],squareSize:256}}),{c(){t=n("main"),s=n("div"),a=n("section"),l=n("h1"),o=w(":("),g=q(),E=n("h1"),Q=w(`Se ha producido un problema en su PC y necesita reiniciarse. Vamos a
        recopilar información sobre el error y después podrá reiniciar.`),R=q(),S=n("h2"),L=w("0% completado"),A=q(),f=n("div"),b=n("div"),oe(v.$$.fragment),M=q(),m=n("div"),C=n("p"),N=w(`Si desea obtener más información y posibles correciones, visita:
            https://www.windows.com/stopcode`),$=q(),_=n("div"),D=n("h2"),B=w(`Si llamas a una persona de soporte técnico, dales esta
              información:`),G=q(),y=n("h2"),O=w("Stop Code: "),T=w(h[0]),this.h()},l(u){t=c(u,"MAIN",{class:!0});var z=i(t);s=c(z,"DIV",{class:!0});var F=i(s);a=c(F,"SECTION",{class:!0});var p=i(a);l=c(p,"H1",{class:!0});var J=i(l);o=x(J,":("),J.forEach(r),g=V(p),E=c(p,"H1",{class:!0});var K=i(E);Q=x(K,`Se ha producido un problema en su PC y necesita reiniciarse. Vamos a
        recopilar información sobre el error y después podrá reiniciar.`),K.forEach(r),R=V(p),S=c(p,"H2",{class:!0});var W=i(S);L=x(W,"0% completado"),W.forEach(r),A=V(p),f=c(p,"DIV",{class:!0});var H=i(f);b=c(H,"DIV",{class:!0});var X=i(b);ne(v.$$.fragment,X),X.forEach(r),M=V(H),m=c(H,"DIV",{class:!0});var j=i(m);C=c(j,"P",{});var Y=i(C);N=x(Y,`Si desea obtener más información y posibles correciones, visita:
            https://www.windows.com/stopcode`),Y.forEach(r),$=V(j),_=c(j,"DIV",{});var k=i(_);D=c(k,"H2",{});var Z=i(D);B=x(Z,`Si llamas a una persona de soporte técnico, dales esta
              información:`),Z.forEach(r),G=V(k),y=c(k,"H2",{});var U=i(y);O=x(U,"Stop Code: "),T=x(U,h[0]),U.forEach(r),k.forEach(r),j.forEach(r),H.forEach(r),p.forEach(r),F.forEach(r),z.forEach(r),this.h()},h(){d(l,"class","text-9xl"),d(E,"class","text-3xl mt-10"),d(S,"class","text-gray-200 text-xl"),d(b,"class","bg-black"),d(m,"class","text-xl flex flex-col justify-between flex-shrink w-2/4"),d(f,"class","flex w-full gap-6"),d(a,"class","w-2/4 flex flex-col gap-4"),d(s,"class","flex items-center w-full h-full justify-center"),d(t,"class","w-screen h-screen bg-blue-windows text-white")},m(u,z){se(u,t,z),e(t,s),e(s,a),e(a,l),e(l,o),e(a,g),e(a,E),e(E,Q),e(a,R),e(a,S),e(S,L),e(a,A),e(a,f),e(f,b),ce(v,b,null),e(f,M),e(f,m),e(m,C),e(C,N),e(m,$),e(m,_),e(_,D),e(D,B),e(_,G),e(_,y),e(y,O),e(y,T),I=!0},p:P,i(u){I||(ie(v.$$.fragment,u),I=!0)},o(u){le(v.$$.fragment,u),I=!1},d(u){u&&r(t),de(v)}}}function pe(h,t,s){let{data:a}=t;const{errorCode:l,qrUrl:o}=a;return h.$$set=g=>{"data"in g&&s(2,a=g.data)},[l,o,a]}class _e extends ee{constructor(t){super(),te(this,t,pe,me,ae,{data:2})}}export{_e as default};
