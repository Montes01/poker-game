import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./global.scss"
import { Provider } from "react-redux"
import { store } from "./lib/store/store.ts"
import { BrowserRouter } from "react-router-dom"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
