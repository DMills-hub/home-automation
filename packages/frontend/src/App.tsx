import './App.css'
import Home from '@pages/Home'
import Global from '@styled/global'
import Navigation from '@components/Navigation'
import { ThemeProvider } from '@styled/index'
import { defaultTheme } from '@styled/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddDevice from '@pages/AddDevice'
import PageWrapper from '@components/styled/PageWrapper'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Global />
        <PageWrapper>
          <Navigation />
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/device/add" Component={AddDevice} />
            </Routes>
          </BrowserRouter>
        </PageWrapper>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
