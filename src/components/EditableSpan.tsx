import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpan = {
    title:string
    callBack:(title:string)=>void
}

export const EditableSpan = (props:EditableSpan) => {

    let [newtitle, setTitle] = useState(props.title)

    const [edit, setEdit] = useState<boolean>(false)

    const activatedEdit =()=> {
        setEdit(true)

    }

    const onBlurHandler = ()=> {
        setEdit(false)
        props.callBack(newtitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }



    return (
        edit?
        <input value={newtitle} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus={true} />:
        <span onDoubleClick={activatedEdit}>{props.title}</span>
    );
};

