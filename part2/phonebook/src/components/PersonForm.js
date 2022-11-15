const PersonForm=( {handleInputNameChange,handleInputNumberChange,AddPerson
    ,newName,newNumber})=>
{
    return(
        <div>            
            <form onSubmit={AddPerson}>
                <div>name: <input onChange={handleInputNameChange} value={newName}/></div>
                <div>number: <input onChange={handleInputNumberChange} value={newNumber}/></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}
export default PersonForm;