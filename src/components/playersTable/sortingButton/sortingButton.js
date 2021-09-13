export const SortingButton = (props) =>{
    return <div>
        <button onClick={
            ()=>{props.clickHandler({sortBy: props.title, order: 'ASC', isActive: true});}
        }>^</button>
        <button onClick={
            ()=>{props.clickHandler({sortBy: props.title, order: 'DESC', isActive: true});}
        }>V</button>
    </div>
}