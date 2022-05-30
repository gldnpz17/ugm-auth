import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import { QueryClient, QueryClientProvider } from "react-query"

const client = new QueryClient()

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
