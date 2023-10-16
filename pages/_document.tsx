import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <link href="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href=" https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/css/nucleo-svg.css" rel="stylesheet" />
      </Head>
      <body className='bg-gray-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
