import './App.css'
import Global from '@styled/global'
import Navigation from '@components/Navigation'
import { ThemeProvider } from '@styled/index'
import { defaultTheme } from '@styled/theme'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Navigation />
    </ThemeProvider>
  )
}

export default App
