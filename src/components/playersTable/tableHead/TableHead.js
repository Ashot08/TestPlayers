import classes from "../PlayersTable.module.css";
import {SortingButton} from "../sortingButton/sortingButton";

export const TableHead = (props) => {
    return <div className={classes.table__head}>
        <div className={classes.table__head_item}>
            ID
            <SortingButton title={'id'} clickHandler={props.setSortType}/>
        </div>
        <div className={classes.table__head_item}>
            Имя
            <SortingButton title={'name'} clickHandler={props.setSortType}/>
        </div>
        <div className={classes.table__head_item}>
            Уровень
            <SortingButton title={'level'} clickHandler={props.setSortType}/>
        </div>
        <div className={classes.table__head_item}>
            Онлайн
            <SortingButton title={'online'} clickHandler={props.setSortType}/>
        </div>
    </div>
}