import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { hydrateRoot } from 'react-dom/client';
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>

       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com"/>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-jJ0/OuMBTwbUwB98UZlP0ZT6T2f+DSO9X0d7C04ah3FqUCPCDzSARhHnZPhzttGq3my4x4op9XPSJyRm+fvhpQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
       <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Cardo:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
        <Main />
        <NextScript />
        <Script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></Script>
        <Script src="//code.jquery.com/jquery-1.11.1.min.js"></Script>
        <Script src="./public/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
        <Script src="./public/assets/vendor/swiper/swiper-bundle.min.js"></Script>
        <Script src="./public/assets/vendor/glightbox/js/glightbox.min.js"></Script>
        <Script src="./public/assets/vendor/aos/aos.js"></Script>
        <Script src="./public/assets/vendor/php-email-form/validate.js"></Script>
        <Script src="./public/assets/js/main.js"></Script>
      </body>
    </Html>
  )
}
