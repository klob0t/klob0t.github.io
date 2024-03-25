const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://klob0t.vercel.app';

export async function dynamicBlurDataUrl(url) {

  const base64str = await fetch(
    `${baseUrl}/_next/image?url=${url}&w=16&q=75`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64')
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 8'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='20' />
         <feComponentTransfer>
          <feFuncA type='discrete' tableValues='1 1' />
         </feComponentTransfer>
      </filter>
      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `
  const toBase64 = (str) =>
   Buffer.from(str).toString('base64')
  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`

}