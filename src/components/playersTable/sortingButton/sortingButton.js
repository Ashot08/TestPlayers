export const SortingButton = (props) =>{
    return <div>
        <button onClick={
            ()=>{props.clickHandler({sortBy: props.title, order: 'ASC'});}
        }>^</button>
        <button onClick={
            ()=>{props.clickHandler({sortBy: props.title, order: 'DESC'});}
        }>V</button>
    </div>
}