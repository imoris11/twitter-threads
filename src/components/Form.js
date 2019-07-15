import React, { useState } from 'react';

export const Form = () => {
    const [text, setText] = useState('');
    const [sections, setSections ] = useState([]);
    const [isVisible, setShowForm] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        let sections = [];
        let temp = '';
        const words = text.split(" ");
        words.forEach((word) => {
            if (word.length + temp.length <= 240){
                temp += ` ${word}`;
            }else{
                sections.push(temp);
                temp = ` ${word}`;
            }
        });
        sections.push(temp);
        setShowForm(false);
        setSections(sections);
    }
    const handleChange = (e) => {
        setText(e.target.value);
    }
    return (
        <div>
        {isVisible === true ? <div>
            <h1 className="header">Generate a Thread</h1>
             <div className="form_wrapper">
            <form onSubmit={handleSubmit} className="form">
                <textarea onChange={handleChange} className="input" value={text} rows={10} placeholder="Enter thread text" />
                <button type="submit" className="button">Generate</button>
            </form>
            </div>
        </div>: 
        <Threads showForm={() => setShowForm(true)} sections={sections} />
    }
    </div>
    )
}

const Threads = (props) => {
   const handleShowForm = () => {
        props.showForm();
    }
        return (
            <div>
                <h1 className="header">Your Thread</h1>
                {props.sections.map((section, key)=>
                <div key={key}>
                     <div className="post_wrapper">
                     <div className="post-header">
                         <div className="profile-picture"></div>
                         <div className='profile-names'>
                             <p className='name'>Awesome Name</p>
                             <p className='username'>@username</p>
                         </div>
                     </div>
                     <p className="post-body">{section}</p>
                 </div>
                 </div>
            )}
               
                <p className="second-button" onClick={handleShowForm}>Return To Form</p>&nbsp;
                <p className="button" onClick={handleShowForm}>Tweet</p>
            </div>
        )
}