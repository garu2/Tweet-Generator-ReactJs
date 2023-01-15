import styles from '../styles/Card.module.css';

import UserImage from '../components/icons/UserImage';
import Virified from '../components/icons/Verified';
import Dots from '../components/icons/Dots';
import Comments from '../components/icons/Comments';
import Retwit from '../components/icons/Retwit';
import Share from '../components/icons/Share';
import Likes from '../components/icons/Likes';

import { addLinks } from '../helpers/addLinks';
import { useRef, useState } from 'react';
import { blobToData } from '../helpers/blobToData';
import { getDate } from '../helpers/getDate';
import { formatCount } from '../helpers/formatCount';

import { toPng } from 'html-to-image';
import { toJpeg } from 'html-to-image';

const TweetCard = () => {
    const currentDate = new Date().toISOString().slice(0, 16);
    const paragraph = "This is a sample tweet. @mentions, #hashtags, https://links.com are all automatically converted.";
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState("Carlos");
    const [username, setUsername] = useState("@carlos25");
    const [date, setDate] = useState("1h");
    const [verified, setVerified] = useState(true);
    const [image, setImage] = useState();
    const [content, setContent] = useState(paragraph);
    const [size, setSize] = useState("95");
    const [commets, setComments] = useState("");
    const [likes, setLikes] = useState("");
    const [retweets, setRetweets] = useState("");
    //console.log('state: ', verified);

    const uploadAvatar = async e => {
        const objAvatar = e.target.files[0];
        setAvatar(await blobToData(objAvatar));
    }
    const uploadImage = async e => {
        const objImage = e.target.files[0];
        setImage(await blobToData(objImage));
    }
    const handleDate = e => {
        //console.log(e.target.value);
        setDate(getDate(e.target.value));
    }
    const handleTexarea = e => {
        setSize(content.length);
        setContent(e.target.value);
    }
    const handleCommetns = e => {
        const countClean = formatCount(e.target.value);
        setComments(countClean);
    }
    const handleLikes = e => {
        const countClean = formatCount(e.target.value);
        setLikes(countClean);
    }
    const handleRetweets = e => {
        const countClean = formatCount(e.target.value);
        setRetweets(countClean);
    }

    const ref = useRef(null);
    const downloadImage = async e => {
        const dataUrl = await toJpeg(ref.current);
        const link = document.createElement('a');
        link.download = "tweet-image.jpg";
        link.href = dataUrl;
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
                        {verified && <Virified/>}
                        <p>{username} • {date}</p>
                    </div>
                    <Dots/>
                </header>
                <p dangerouslySetInnerHTML={{__html: addLinks(content)}}></p>
                {
                    image &&
                    <div className={styles.images}>
                        <img src={image} alt="tweet image" />
                    </div>
                }
                <footer>
                    <div>
                        <Comments/>
                        <span>{commets}</span>
                    </div>
                    <div>
                        <Retwit/>
                        <span>{likes}</span>
                    </div>
                    <div>
                        <Likes/>
                        <span>{retweets}</span>
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
                <form>
                    <span>
                        <label>Avatar: </label>
                        <input type="file" onChange={uploadAvatar} accept=".png, .jpg, .svg"/>
                    </span>
                    <span>
                        <label>Name: </label>
                        <input type="text" onChange={e=>setName(e.target.value)} value={name}/>
                    </span>
                    <span>
                        <label>Username: </label>
                        <input type="text" onChange={e=>setUsername(e.target.value)} value={username}/>
                    </span>
                    <span>
                        <label>Tweet date: </label>
                        <input type="datetime-local" onChange={handleDate} max={currentDate}/>
                    </span>
                    <span>
                        <label>Tweet image: </label>
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
                        <textarea cols="30" rows="5" onChange={handleTexarea} 
                            value={content}
                            maxLength="281"
                        ></textarea>
                    </span>
                    <div>
                        <span>
                            <label>Comments: </label>
                            <input type="number" onChange={handleCommetns}/>
                        </span>
                        <span>
                            <label>Retweet: </label>
                            <input type="number" onChange={handleLikes}/>
                        </span>
                        <span>
                            <label>Likes: </label>
                            <input type="number" onChange={handleRetweets}/>
                        </span>
                    </div>
                    <button className={styles.btnDownload} 
                        type='button'
                        onClick={downloadImage}
                    >Download Tweet</button>
                </form>
            </div>
        </div>
        </>
    );
}
 
export default TweetCard;

