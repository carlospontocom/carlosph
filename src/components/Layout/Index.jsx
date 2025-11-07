import Footer from "../Footer/Index";
import Header from "../Header/Index";

function Layout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;