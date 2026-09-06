import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layout/Footer"
function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer/>
    </>
  );
}

export default App;