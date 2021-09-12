import classes from "./Main.module.css";
import {PlayersTable} from "../playersTable/PlayersTable";

export const Main = (props) => {
    return (
        <main>
            <div className={classes.container}>
                <PlayersTable />
            </div>
        </main>
    )
}