import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './components/_player-control.scss'
import './components/_player.scss'
import './components/_sound-control.scss'
import './components/style.scss'
import './audio.sass'


const Audio = () => {

    const songs = useSelector(state=>state.songs);
    useEffect(()=> {
            document.querySelector('.library-song').classList.add('selected')
            const audio = document.querySelector("audio");
            let librarySongs = Array.from(document.querySelectorAll(".library-song"));
            let playStatus = false;

            librarySongs.forEach((song) => {
                song.addEventListener("click", (e) => {
                    librarySongs.forEach((otherSong) => {
                        otherSong.classList.remove("selected");
                        document.querySelectorAll('.library-song').forEach(elem=>elem.style.borderBottom = 'none');
                        document.querySelectorAll(".song-number").forEach(elem=>elem.style.display = "inline");
                        document.querySelectorAll(".playing-bullet").forEach(elem=>elem.style.display = "none");
                        document.querySelectorAll(".song-current-time").forEach(elem=>elem.style.display = "none");
                        document.querySelectorAll(".song-duration").forEach(elem=>elem.style.display = "block");
                    });
                    e.target.classList.add("selected");
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";

                    let songId;
                    songId = song.id;
                    songs.filter((selectedSong) => {
                        if (selectedSong.id == song.id) {
                            playSong(selectedSong);
                        }
                    });

                });
            });

            function playSong(song) {
                audio.setAttribute("src", song.audio);
                playStatus = false;
                document.querySelectorAll('.selected').forEach(elem=> {
                    elem.borderBottom = 'none';
                });
                playPause();
            }

//*player control actions
//play||pause action
            const playPauseIcon = document.getElementById("play-pause");

            playPauseIcon.addEventListener("click", () => {
                playPause();
            });

            function playPause() {
                if (playStatus === false) {
                    playPauseIcon.className = "fas fa-pause";
                    document.querySelector('.selected').style.borderBottom = "1px solid #FF7000";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    document.querySelector(".selected .song-duration").style.display = "none";
                    document.querySelector(".selected .song-current-time").style.display = "block";
                    audio.play();
                    playStatus = true;
                } else {
                    playPauseIcon.className = "fas fa-play";
                    document.querySelectorAll('.library-song').forEach(elem=>elem.style.borderBottom = 'none');
                    document.querySelectorAll(".song-number").forEach(elem=>elem.style.display = "inline");
                    document.querySelectorAll(".playing-bullet").forEach(elem=>elem.style.display = "none");
                    document.querySelector(".selected .song-duration").style.display = "block";
                    document.querySelector(".selected .song-current-time").style.display = "none";
                    audio.pause();
                    playStatus = false;
                }
            }
//* sound volume control
            const volume = document.querySelector(".sound-control input");
            volume.addEventListener("change", () => {
                audio.volume = volume.value / 100;
            });


//*skipping back/forward
            const back = document.getElementById("backward");
            const forward = document.getElementById("forward");
            back.addEventListener("click", () => skipSong("backward"));
            forward.addEventListener("click", () => skipSong("forward"));

            audio.addEventListener("ended", () => skipSong("forward"));
            function skipSong(direction) {
                const selectedSong = document.querySelector(".selected");
                const selectedSongIndex = librarySongs.indexOf(selectedSong);
                selectedSong.classList.remove("selected");
                document.querySelectorAll('.library-song').forEach(elem=>elem.style.borderBottom = 'none');
                document.querySelectorAll(".song-number").forEach(elem=>elem.style.display = "inline");
                document.querySelectorAll(".playing-bullet").forEach(elem=>elem.style.display = "none");
                document.querySelectorAll(".song-current-time").forEach(elem=>elem.style.display = "none");
                document.querySelectorAll(".song-duration").forEach(elem=>elem.style.display = "block");
                if (direction === "backward") {
                    let previousSong = librarySongs[selectedSongIndex - 1];
                    if (librarySongs.indexOf(previousSong) === -1) {
                        previousSong = librarySongs[librarySongs.length - 1];
                    }
                    previousSong.classList.add("selected");
                    document.querySelector('.selected').style.borderBottom = "1px solid #FF7000";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    songs.filter((song) => {
                        if (song.id == previousSong.id) {
                            playSong(song);
                        }
                    });
                } else if (direction === "forward") {
                    let nextSong = librarySongs[selectedSongIndex + 1];

                    if (librarySongs.indexOf(nextSong) === -1) {
                        nextSong = librarySongs[0];
                    }
                    nextSong.classList.add("selected");
                    document.querySelector('.selected').style.borderBottom = "1px solid #FF7000";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    songs.filter((song) => {
                        if (song.id == nextSong.id) {
                            playSong(song);
                        }
                    });
                }
            }
//*defining audio and song info
//format current/duration time
            function timeFormat(time) {
                return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
            }

            const durationInput = document.querySelector(".player input");

            audio.addEventListener("loadedmetadata", () => {
                try {

                const currentTime = document.querySelector(".selected .song-current-time");
                durationInput.value = audio.currentTime;
                durationInput.setAttribute("max", audio.duration);
                currentTime.innerText = `${timeFormat(audio.currentTime)}`;
                } catch (e) {

                }

            });
            audio.addEventListener("timeupdate", () => {
                try{
                durationInput.value = audio.currentTime;
                const currentTime = document.querySelector(".selected .song-current-time");
                currentTime.innerText = `${timeFormat(audio.currentTime)}`;
                document.querySelector(".player div div").style.left = `${
                    (audio.currentTime / audio.duration) * 100}%`;
                } catch (e) {

                }
            });

            durationInput.addEventListener("change", () => {
                try {
                audio.currentTime = durationInput.value;
                } catch (e) {

                }
            });



        }
    )

    const songsItems = songs.map(songItem => {
        const {id,name,duration} = songItem;

    return(
            <div className="library-song" id={id} key={id}>
                <div className="library-song-info">
                    <div className="playing-bullet"></div>
                    <span className="song-number">{id+1}  &nbsp;</span><span className="song-name">{name}</span>
                </div>
                <div className="song-duration">{duration}</div>
                <div className="song-current-time"></div>
            </div>
        )
    })

    return(
            <div className="audio-content">
                <div className="library">
                    <h3 className="album-name">Демо - Альбом</h3>
                    {songsItems}
                </div>
                <div className="audio-control">
                    <div className="player">
                        <div>
                            <input type="range"/>
                            <div></div>
                        </div>
                    </div>
                    <div className="player-control">
                        <i className="fas fa-backward" id="backward"></i>
                        <i className="fas fa-play" id="play-pause"></i>
                        <i className="fas fa-forward" id="forward"></i>
                    </div>
                    <div className="sound-control">
                        <i className="fas fa-volume-down"></i>
                        <input type="range" max="100" step="1"/>
                        <i className="fas fa-volume-up"></i>
                    </div>
                    <audio
                        src="https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%93%D0%B5%D1%82%D1%82%D0%BE(KUSTOM%20Groove%201200).mp3?alt=media&token=c47deb62-09c3-47bd-867b-d4b703519b8c"></audio>
                </div>
            </div>
    )


}

export default Audio;
