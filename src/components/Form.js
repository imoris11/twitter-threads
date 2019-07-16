import React, { useState } from 'react';
import TwitterLogin from 'react-twitter-auth';

export const Form = () => {
    const [text, setText] = useState('');
    const [ sections, setSections ] = useState([]);
    const [ isVisible, setShowForm ] = useState(true);
    const [ showPageNumber, setShowPageNumber ] = useState(true);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let sections = [];
        const sentences = text.split(". "); //Split into sentences
        const charLimit = showPageNumber ? 275 : 280; //Assume thread ends in 10s
        let temp = '';
        sentences.forEach((sentence) => {
            if (sentence.length + temp.length <= charLimit){
                temp += ` ${sentence}. `;
            }else{
                sections.push(temp);
                temp = ` ${sentence}.`;
            }
        });
        const char = temp[temp.length-1];
        //edge case remove duplicate '.'
        if (char === '.') {
            temp = temp.substring(0, temp.length-1);
        }
        sections.push(temp);
        updateSections(sections);
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }
    const updateSections = (sections) => {
        if (showPageNumber) {
            sections = sections.map((sentence, i )=> {
                sentence  = `${i+1}/${sections.length})${sentence}`;
                return sentence;
            });
        }
        setSections(sections);
        setShowForm(false);
    }
    return (
        <div>
        {isVisible === true ? <div>
            <h1 className="header">Generate a Thread</h1>
             <div className="form_wrapper">
            <form onSubmit={handleSubmit} className="form">
                <textarea onChange={handleChange} className="input" value={text} rows={10} placeholder="Enter thread text" />
                <div className='button_wrapper'>
                <div>
                    <input onChange={()=> setShowPageNumber(!showPageNumber)} checked={showPageNumber} type="checkbox" name="number" />
                    <p className="page">Show Page Number (1/x)</p>
                </div>
                     <button  type="submit" className="button">Generate</button>
                </div>
            </form>
            </div>
        </div>: 
        <Threads showForm={() => setShowForm(true)} sections={sections} showPageNumber={showPageNumber} />
    }
    </div>
    )
}

const Threads = (props) => {
    const [ loading, setLoading ] = useState(false);
   const handleShowForm = () => {
        props.showForm();
    }
    const onSuccess = (response) => {
        setLoading(true);
        response.json().then(body => {
          const data = {
              posts: props.sections
          }
          fetch('https://thread-generator-api.herokuapp.com/api/v1/status',
          {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(res => res.json()).then(data => {
            setLoading(false);
            alert("Thread successfully tweeted!")
            handleShowForm();
          }).catch(error => {
              alert(error);
          })
        });
      }
    
     const onFailed = (error) => {
        alert("An error occurred");
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
                <TwitterLogin loginUrl="https://thread-generator-api.herokuapp.com/api/v1/auth/twitter"
                      onFailure={onFailed}
                      onSuccess={onSuccess}
                      showIcon={true}
                      disabled={loading}
                      style={{backgroundColor:'transparent', borderWidth:0}}
                      >
                    {loading ? <p className="button" >Tweeting...</p> : <p className="button" >Tweet</p>}
             </TwitterLogin>
            </div>
        )
}