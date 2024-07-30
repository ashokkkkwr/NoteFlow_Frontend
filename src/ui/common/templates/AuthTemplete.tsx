import useLang from "@hooks/useLang";
import { Outlet } from "react-router-dom";

const AuthTemplete = () => {
    const { lang } = useLang()
    return (
        <>

            <Outlet />
        </>
    )
}
export default AuthTemplete