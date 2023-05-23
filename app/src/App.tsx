import './App.css'
import Home from '@pages/Home'
import Global from '@styled/global'
import Navigation from '@components/Navigation'
import { ThemeProvider } from '@styled/index'
import { defaultTheme } from '@styled/theme'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Global />
        <Navigation />
        <Home />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
