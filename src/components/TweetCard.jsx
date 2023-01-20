import styles from '../styles/Card.module.css';

import Verified from './icons/Verified';
import Comments from './icons/Comments'
import Retwit from './icons/Retwit'
import Likes from './icons/Likes'
import Share from './icons/Share'
import UserImage from './icons/UserImage'
import Dots from './icons/Dots'

import { addLinks } from '../helpers/addLinks';
import { useRef, useState } from 'react';
import { blobToData } from '../helpers/blobToData';
import { getDate } from '../helpers/getDate';
import { formatCount } from '../helpers/formatCount';

import { toPng } from 'html-to-image'


const TweetCard = () => {
    const currentDate = new Date().toISOString().slice(0, 16);
    const paragraph = "This is a sample tweet. @mentions, #hashtags, https://links.com are all automatically converted."

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState("Carlos");
    const [username, setUsername] = useState("@carlos25");
    const [image, setImage] = useState();
    const [verified, setVerified] = useState(true)
    const [date, setDate] = useState("1h");
    const [content, setContent] = useState(paragraph);
    const [size, setSize] = useState("95")
    const [comment, setCommet] =  useState("")
    const [likes, setLikes] =  useState("")
    const [retweet, setRetweet] =  useState("")

    const uploadAvatar = async e => {
        const objAvatar = e.target.files[0];
        setAvatar(await blobToData(objAvatar))
    }
    const uploadImage = async e => {
        const objAvatar = e.target.files[0];
        setImage(await blobToData(objAvatar))
    }
    const handleDate = e => {
        //console.log(e.target.value);
        setDate(getDate(e.target.value));
    }
    const handleTextarea = e => {
        setSize(content.length)
        setContent(e.target.value)
    } 
    const handleComments = e => {
        const countClean = formatCount(e.target.value);
        setCommet(countClean);
    }
    const handleLikes = e => {
        const countClean = formatCount(e.target.value);
        setLikes(countClean);
    }
    const handleRetweets = e => {
        const countClean = formatCount(e.target.value);
        setRetweet(countClean);
    }
    const ref =  useRef(null);
    const downloadImage = async e => {
        const dataUrl = await toPng(ref.current);
        const link = document.createElement('a')
        link.download = "tweet-image.png"
        link.href = dataUrl
        link.click();
    }

    return (
        <>
        <div className={styles.hero}>
            <h1>Tweet Generator</h1>
            <section className={styles.twitCard} ref={ref}>
                <picture className={styles.userImage}>
                    { avatar ? <img src={avatar} alt="avatar" /> : <UserImage/> }
                    
                </picture>
                <div className={styles.content}>
                    <header>
                        <div>
                            <h3>{name}</h3>
                            { verified && <Verified/> }
                            <p>{username} • {date}</p>
                        </div>
                        <Dots/>
                    </header>
                    <p dangerouslySetInnerHTML={{__html:addLinks(content) }}></p>
                    {
                        image &&
                        <div className={styles.images}>
                            <img src={image} alt="tweet image" />
                        </div>
                    }
                    <footer>
                        <div>
                            <Comments/>
                            <span>{comment}</span>
                        </div>
                        <div>
                            <Retwit/>
                            <span>{likes}</span>
                        </div>
                        <div>
                            <Likes/>
                            <span>{retweet}</span>
                        </div>
                        <div>
                            <Share/>
                        </div>
                    </footer>
                </div>
            </section>
        </div>
        <div className={styles.bgWave}></div>
        <div className={styles.formInputs}>
            <div className={styles.container}>
                <form >
                    <span>
                        <label>Avatar:</label>
                        <input type="file" onChange={uploadAvatar} accept=".png, .jpg, .svg"/>
                    </span>
                    <span>
                        <label>Name:</label>
                        <input type="text" onChange={e=>setName(e.target.value)} value={name}/>
                    </span>
                    <span>
                        <label>Username:</label>
                        <input type="text" onChange={e=>setUsername(e.target.value)} value={username}/>
                    </span>
                    <span>
                        <label>Tweet date:</label>
                        <input type="datetime-local" onChange={handleDate} max={currentDate}/>
                    </span>
                    <span>
                        <label>Tweet image:</label>
                        <input type="file" onChange={uploadImage} accept=".png, .jpg, .svg"/>
                    </span>
                    <span>
                        <button type='button'
                            onClick={()=>setVerified(current=>!current)}
                            className={verified ? styles.btnVerified : ""}
                        >Verified
                        </button>
                    </span>
                    <span>
                        <label>Content: {`${size}/280`}</label>
                        <textarea cols="30" rows="5"
                            onChange={handleTextarea}
                            value={content}
                            maxLength="281"
                        ></textarea>
                    </span>
                    <div>
                        <span>
                            <label>Comments:</label>
                            <input type="number" onChange={handleComments}/>
                        </span>
                        <span>
                            <label>Retweet:</label>
                            <input type="number" onChange={handleLikes}/>
                        </span>
                        <span>
                            <label>Likes:</label>
                            <input type="number" onChange={handleRetweets}/>
                        </span>
                    </div>
                    <button
                        className={styles.btnDownload}
                        type="button"
                        onClick={downloadImage}
                    >Download Tweet</button>
                </form>
            </div>
            
        </div>
        </>
    );
}
 
export default TweetCard;