import classes from "./PlayersTable.module.css";
import { Scrollbar } from "react-scrollbars-custom";
export const PlayersTable = (props) => {
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <div>

                </div>
                <div className={classes.table__head}>
                    <div className={classes.table__head_item}>ID</div>
                    <div className={classes.table__head_item}>Имя</div>
                    <div className={classes.table__head_item}>Уровень</div>
                    <div className={classes.table__head_item}>Онлайн</div>
                </div>
                <Scrollbar style={{ height: 520 }} >
                    <div className={classes.table__body}>
                        <div className={classes.player}>Player 1</div>
                        <div className={classes.player}>Player 2</div>
                        <div className={classes.player}>Player 3</div>
                    </div>
                </Scrollbar>
            </div>

        </div>
    )
}