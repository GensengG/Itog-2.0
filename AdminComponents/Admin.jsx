import "../App.jsx";
import "../App.css";
import { HallManager } from "./HallManager.jsx";
import { HallConfiguration } from "./HallConfiguration.jsx";
import { HallPrice } from "./HallPrice.jsx";
import { HallOpened } from "./HallOpened.jsx";
import { SessionGrid } from "./SessionGrid.jsx";

export const Admin = () => {

    return (
        <>
            <main className = "admin__main">
                <HallManager />
                <HallConfiguration />
                <HallPrice /> 
                <SessionGrid />
                <HallOpened />
            </main>
        </>
    );

};

export default Admin;