import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./assets/layout";
import TicketForm from "./pages/ticketForm";
import LoginPage from "./pages/login";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<TicketForm />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
