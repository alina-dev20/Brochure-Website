import Script from "next/script";
import { YM_ID } from "@/lib/metrika";

export function Metrika() {
  if (!YM_ID) return null;
  return (
    <Script id="ym" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
      k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
      ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
    </Script>
  );
}
