import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './components/_player-control.scss'
import './components/_player.scss'
import './components/_sound-control.scss'
import './components/style.scss'
import './audio.sass'
import fun_club_photo1 from "../fun-club/6487710a69fd22ca0a9f4a05503ac229 2.png";


const Audio = () => {

    const songs = useSelector(state=>state.mainReducer.songs);
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
    useEffect(()=> {

            document.querySelector('.texts-invoke-btn').addEventListener('click',() => {
                document.querySelector('.fun-club-offer__slider').classList.toggle('texts-invoke');
            });

            slider({
                container: '.offer__slider',
                slide: '.offer__slide',
                nextArrow: '.offer__slider-next',
                prevArrow: '.offer__slider-prev',
                totalCounter: '#total',
                currentCounter: '#current',
                wrapper: '.offer__slider-wrapper',
                field: '.offer__slider-inner',

            })
            function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
                let offset = 0;
                let slideIndex = 1;

                const slides = document.querySelectorAll(slide),
                    slider = document.querySelector(container),
                    prev = document.querySelector(prevArrow),
                    next = document.querySelector(nextArrow),
                    total = document.querySelector(totalCounter),
                    current = document.querySelector(currentCounter),
                    slidesWrapper = document.querySelector(wrapper),
                    width = window.getComputedStyle(slidesWrapper).width,
                    slidesField = document.querySelector(field)

                if (slides.length < 10) {
                    total.textContent = `0${slides.length}`;
                    current.textContent =  `0${slideIndex}`;
                } else {
                    total.textContent = slides.length;
                    current.textContent =  slideIndex;
                }

                slidesField.style.width = 100 * slides.length + '%';
                slidesField.style.display = 'flex';
                slidesField.style.transition = '0.5s all';

                slidesWrapper.style.overflow = 'hidden';

                slides.forEach(slide => {
                    slide.style.width = width;
                });

               // slider.style.position = 'relative';


                next.addEventListener('click', () => {
                    if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
                        offset = 0;
                    } else {
                        offset += deleteNotDigits(width);
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex == slides.length) {
                        slideIndex = 1;
                    } else {
                        slideIndex++;
                    }

                    if (slides.length < 10) {
                        current.textContent =  `0${slideIndex}`;
                    } else {
                        current.textContent =  slideIndex;
                    }

                });

                prev.addEventListener('click', () => {
                    if (offset == 0) {
                        offset = deleteNotDigits(width) * (slides.length - 1);
                    } else {
                        offset -= deleteNotDigits(width);
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex == 1) {
                        slideIndex = slides.length;
                    } else {
                        slideIndex--;
                    }

                    if (slides.length < 10) {
                        current.textContent =  `0${slideIndex}`;
                    } else {
                        current.textContent =  slideIndex;
                    }


                });

                function deleteNotDigits(str) {
                    return +str.replace(/\D/g, '');
                }
            }
        },[]
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
                <div className="offer__slider fun-club-offer__slider">
                    <span className="fun-club-headers">??????????????</span>
                    <img className="fun-club-img" src={fun_club_photo1} alt="album"/>
                    <span className="album">????????-????????????</span>
                    <div className="offer__slider-wrapper">
                        <div className="offer__slider-inner">
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">??????????</h1><br/>
                                <p className="texts-paragraf">????????????: ?????????????????? ??. <br/>
                                    ??????????: ???????????? ??. <br/><br/>

                                    ??????, ???? ?????????? ??????, ???????? ????????????!<br/>
                                    ?????????? ???????????? ????????????, ?????? ??????????. <br/>
                                    ????????????????: ????????????, ?? ???????? ???????????? <br/>
                                    ?????????????? ???? ???? ?????????????? ?? ???????????????? ???????????? <br/>
                                    ???????? ?????? ?????????? ??????????!???, ?????????? ????????????. <br/>
                                    ??????????, ?? ?????????? ????????!? ...?????? ??????????????! <br/>
                                    ???????????????? ??????????, ???????????????? ????????????, <br/>
                                    ???????????????? ???????????????? ???? ??????????????, ???? ??????????... <br/><br/>

                                    ???????????? ???????????? ?????????????????????? ????????,<br/>
                                    ???????????? ???????????? ???????????????? ??????????!<br/>
                                    ???????????????????? ?????????????? ???? ??????????,<br/>
                                    ?????? ???????????????? ???? ?????????????? ??????????... <br/><br/>

                                    ??????, ???? ?????????? ??????, ???????? ????????????,<br/>
                                    ???????? ?????????? ??????????, ???????? ??????????. <br/>
                                    ?????????????????? ???????????????? ???????????? ??????????: <br/>
                                    ???? ???????????? ???????????????? ?????????????? ????????????????. <br/>
                                    ??????, ???? ?????????? ??????, ???????? ??????????????. <br/>
                                    ????????, ???????????? ????????... ?? ?????? ??????????????!? <br/>
                                    ?????????????????? ?????????? ?? ???????????????????? ?????? ????????????????, <br/>
                                    ???? ?????????? ???? ?????????????????? ???? ??????????????, ???? ??????????! <br/><br/>

                                    ???????????? ???????????? ?????????????????????? ???????? <br/>
                                    ???????????? ???????????? ???????????????? ?????????? <br/>
                                    ???????????????????? ?????????????? ???? ?????????? <br/>
                                    ?????? ???????????????? ???? ?????????????? ??????????... <br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">????????????????</h1> <br/>
                                <p className="texts-paragraf">????????????: ?????????????????? ??. <br/>
                                    ??????????: ?????????????? ??. <br/><br/>

                                    ?????? ???????? ????????, ?? ?????????? ????????... <br/>
                                    ???????? ?? ???????????? ?????????? ????????????, <br/>
                                    ???? ???????????????? ???????????????? ?????????? ?? ??????-????<br/>
                                    ?????? ???????????????????? ?????????????? ?? ????????????????.<br/>
                                    ?? ?? ???????????????? ????, ?????? ????????<br/>
                                    ?? ??????, ?????? ?????? ?????????????????? ?? ????????????????.<br/>
                                    ???????????????????????? ???????????? ???????? ?? ??????????????,<br/>
                                    ?? ?? ???????????????????? ???? ???????? ??????????????????!<br/><br/>

                                    ???????????? ???? ????????, ?????????? ????????????.<br/>
                                    ?? ???????? ?????????????? ?????? ???? ?????????????? ????????????.<br/>
                                    ???????????? ???? ???????? ???? ???????? ????????????.<br/>
                                    ???????????? ?????? ????????, ???????? ???? ??????????.<br/>
                                    x2
                                    <br/><br/>

                                    ?????? ?????????? ??????, ?? ?????????????? ??????,<br/>
                                    ???? ?? ?? ???????? ?????????? ????????????,<br/>
                                    ???????????????????? ???????? ???? ????????<br/>
                                    ?????????? ??????????, ?? ???????? ??????????.<br/>
                                    ?????????????? ?????? ?????????? ??????????,<br/>
                                    ???????????????????? - ???????????????????? ??????<br/>
                                    ?? ?????????? ?????????? ????????????????<br/>
                                    ?? ?????????? ?? ??????, ?????? ???????????????? ??????...<br/><br/>

                                    ???????????? ???? ????????, ?????????? ????????????.<br/>
                                    ?? ???????? ?????????????? ?????? ???? ?????????????? ????????????.<br/>
                                    ???????????? ???? ???????? ???? ???????? ????????????.<br/>
                                    ???????????? ?????? ????????, ???????? ???? ??????????.<br/>
                                    x2<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">????????????</h1> <br/>
                                <p className="texts-paragraf">????????????: ?????????????????? ??. <br/>
                                    ??????????: ???????????? ??. <br/><br/>

                                    ??????????-?????????????? ???????????? ????????<br/>
                                    ?????????? ???? ???????????????? ????????.<br/>
                                    ??????????, ???? ???????? ??????????, ???????????? ????????.<br/>
                                    ??????, ?????? ???? ???????? ??????????????.<br/><br/>

                                    ?????????? ?????????? ???????? ???????????? ??????????????.<br/>
                                    ?????????? ???? ??????????????, ?????????? ?? ???????????? ????????????.<br/>
                                    ?????????? ???????????? ???????????? ?????????? ?? ??????????????.<br/>
                                    ?????????? ?????????????? ???? ???????? ???????? ?????????????? ????????????!<br/><br/>

                                    ?????????? ???????????????? ???????????? ??????????<br/>
                                    ??????, ?????? ?????????? ?????? ???????? ??????????.<br/>
                                    ?????????? ???? ????????????, ???? ???? ???? ??????.<br/>
                                    ???????????? ?????????? ????????????!<br/><br/>

                                    ?????????? ?????????? ???????? ???????????? ??????????????.<br/>
                                    ?????????? ???? ??????????????, ?????????? ?? ???????????? ????????????.<br/>
                                    ?????????? ???????????? ???????????? ?????????? ?? ??????????????.<br/>
                                    ?????????? ?????????????? ???? ???????? ???????? ?????????????? ????????????!<br/><br/>

                                    ????????, ?????? ????????????????, ?? ???????? ??????????.<br/>
                                    ??????????, ???? ???????? ??????????????????:<br/>
                                    ????????????, ?????? ?????????? ?????????? ??????????????.<br/>
                                    ?? ???? ???????????? ?????????? ????????????????!<br/><br/>

                                    ?????????? ?????????? ???????? ???????????? ??????????????.<br/>
                                    ?????????? ???? ??????????????, ?????????? ?? ???????????? ????????????.<br/>
                                    ?????????? ???????????? ???????????? ?????????? ?? ??????????????.<br/>
                                    ?????????? ?????????????? ???? ???????? ???????? ?????????????? ????????????!<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">????????????</h1> <br/>
                                <p className="texts-paragraf">????????????: ???????????????? ??., ?????????????????? ??. <br/>
                                    ??????????: ???????????? ??. <br/><br/>

                                    ?????? ????????????, ?????? ?????????? ???????????????? ???? ??????????!?<br/>
                                    ???? ???? ?????????? ?????????? ???????? ????????????.<br/>
                                    ??????, ?????? ????????????, ???????? ???????? ???? ????????????-<br/>
                                    ???????? ???? ?????????? ?? ???????????? ?????????????? ????????!<br/>
                                    ???????? ?? ????, ?????? ?? ?????? ???????? ?????? ????????????????,<br/>
                                    ????????, ?????? ???? ???????? ???????????? ?? ??????.<br/>
                                    ?????????? ???? ?????????? ?? ???????? ??????????????????,<br/>
                                    ?????????? ???? ???????????? ?????????????????? ????????<br/><br/>

                                    ??????????, ??????, ??????????????????????.<br/>
                                    ?????????? ???? ???????? ???? ??????????.<br/>
                                    ???? ???????????? ???????????????????? ??????????,<br/>
                                    ???????? ????, ?????? ???????????? ????????????!<br/><br/>

                                    ?????? ????????????, ????????????, ???????????? ???? ??????????????????,<br/>
                                    ??????-???? ???????????? ?? ???????? ?????????????????? ????????.<br/>
                                    ???? ????????????????????, ???????????????????? ???? ??????????????<br/>
                                    ?? ?????? ?????? ?????????? ?????? ?????????????????? ?? ????????.<br/>
                                    ?????????? ?????? ????????????????, ??????-???? ??????????????????<br/>
                                    ????????, ????????????????????, ???????????????? ???????????? ????????????<br/>
                                    ???????????? ?????????????? ?????????? ?????????? ???? ??????????????<br/>
                                    ?????????????? ?? ?????????? ?? ?????????????? ??????????<br/><br/>

                                    ??????????, ??????, ??????????????????????.<br/>
                                    ?????????? ???? ???????? ???? ??????????.<br/>
                                    ???? ???????????? ???????????????????? ??????????,<br/>
                                    ???????? ???? ?????? ???????????? ????????????!<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">????????</h1> <br/>
                                <p className="texts-paragraf">????????????: ?????????????????? ??. <br/>
                                    ??????????: ???????????? ??. <br/><br/>

                                    ???????? ?????????? ?????? ??????????????,<br/>
                                    ???????? ????????????, ?????????? ??????????.<br/>
                                    ?????????? ????????, ???????? ?? ???????????? ???????? ?????????????? ????????, ???????? ?? ????????.<br/>
                                    ?????????? ?????????? ???????? ?? ????????????,<br/>
                                    ?????????? ?? ????????, ?????????????? ????????.<br/>
                                    ???? ?????????? ??????????????,???? ????????, ??????????, ?????????????? ????????.<br/><br/>

                                    ???????? ?????????? ??? ?????? ????????,<br/>
                                    ???????????? ?????? ??? ?????? ????????,<br/>
                                    ?? ???????????? ??????????, ?? ???????????? ??????????<br/>
                                    ???? ?????????????? ?????????? ????????...<br/><br/>

                                    ???????????? ??????, ?????????????? ????????.<br/>
                                    ?????????? ??????, ?????????? ????????????.<br/>
                                    ?????????? ??????, ???????? ?? ???????????? ???????? ?????????????? ????????, ???????? ?? ????????.<br/>
                                    ?????????? ??????, ???????????? ??????????????<br/>
                                    ?????????????? ?????? ?????? ????????????.<br/>
                                    ?????????? ???????? ?????????????? ?????????????? ?????????????? ????????.<br/><br/>

                                    ???????? ?????????? ??? ?????? ????????,<br/>
                                    ???????????? ?????? ??? ?????? ????????,<br/>
                                    ?? ???????????? ??????????, ?? ???????????? ??????????<br/>
                                    ???? ?????????????? ?????????? ????????...<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">???????????? ????????</h1> <br/>
                                <p className="texts-paragraf">????????????: ?????????????????? ??. <br/>
                                    ??????????: ???????????? ??. <br/><br/>

                                    ?????????? ???? ???????????? ?????????????? ??????<br/>
                                    ?? ?????????? ???????????? ???????? ?? ????????<br/>
                                    ... ???????????? ???????? ?????????? ??????.<br/>
                                    ??????, ?????? ???? ?????????? ?? ???????? ??????????,<br/>
                                    ???? ???????????? ?? ?????????? ?????????? ??????????<br/>
                                    ... ???????????? ???????????? ??????????.<br/>
                                    ???? ???????????? ???????????? ?????? ?????????? ????????,<br/>
                                    ?? ?????????? ?????? ???? ???????? ????????<br/>
                                    ... ????????????????, ???????? ????????????.<br/>
                                    ????????????, ?????? ???????????? ?? ????????????????,<br/>
                                    ?????? ?????????? ?? ?????????????? ??????????<br/>
                                    ... ???? ?????? ???????? - ???????????? ????????!<br/><br/>

                                    ???????????? ???????????? ?????????? ???????? ??????????<br/>
                                    ?????????? ???????????? ?? ??????????<br/>
                                    ???? ???????????? ?????? ???? ?? ?????? ????????<br/>
                                    ?????? ???? ?? ?????? ???????? ??????????????<br/>
                                    ???? ?? ?????????????????? ?????????? ???? ??????????<br/>
                                    ?? ???????? ???? ???????????? ????????<br/>
                                    ?? ?????????? ???????? ?? ???????? ????????????<br/>
                                    ?? ?????????? ???????????? ????????<br/><br/>

                                    ?????????????????? ???????? ?????????? ????????????<br/>
                                    ???? ???????????? ?????????? ???????????????? ??????????<br/>
                                    ... ???????????? ?????????? ?????????? ??????.<br/>
                                    ?????????? ?? ?????????? - ???????????????? ????????,<br/>
                                    ???? ?????????? ??????????, ???? ???????? ?? ????????<br/>
                                    ... ???? ???????????????? ???????? ????????.<br/>
                                    ???? ????????, ?? ???????? ???? ????????????,<br/>
                                    ?? ?? ?????????? ?????????????????? ?? ??????<br/>
                                    ... ?? ?????????? ???? ??????????<br/>
                                    ?? ???????????? ???????????? ???????????? ??????????.<br/>
                                    ?? ???????? ???????? ????????, ???? ?????? ????????????!<br/>
                                    ... ???? ?????????? ?????? ????????????<br/><br/>

                                    ???????????? ???????????? ?????????? ???????? ??????????<br/>
                                    ?????????? ???????????? ?? ??????????<br/>
                                    ???? ???????????? ?????? ???? ?? ?????? ????????<br/>
                                    ?????? ???? ?? ?????? ???????? ??????????????<br/>
                                    ???? ?? ?????????????????? ?????????? ???? ??????????<br/>
                                    ?? ???????? ???? ???????????? ????????<br/>
                                    ?? ?????????? ???????? ?? ???????? ????????????<br/>
                                    ?? ?????????? ???????????? ????????<br/><br/>

                                    ?????????? ??????????????<br/>
                                    ???????? ????????????<br/>
                                    ???????? ?????????? ?????????? ?????????? ?? ??????????<br/>
                                    ?????????? ??????????????<br/>
                                    ?????????? ????????<br/>
                                    ???????????? ?????????? ?????????? ?? ?????????? ??????????<br/><br/>

                                    ???????????? ?????????? ???????????? ????????<br/>
                                    ??????, ?????? ???????? ???????????? ????????<br/>
                                    ???? ???? ?????????? ???????? ??????????,<br/>
                                    ???? ?????? ???????? ???? ???? ???????? ????????<br/>
                                    ?? ???????????? ?????? ???? ???? ??????<br/>
                                    ?????????????? ???????????? ??????<br/>
                                    "???? ???????????? ?????? ???????? ????????"-<br/>
                                    ?????? ?????? ??????????!<br/><br/>

                                    ???????????? ???????????? ?????????? ???????? ??????????<br/>
                                    ?????????? ???????????? ?? ??????????<br/>
                                    ???? ???????????? ?????? ???? ?? ?????? ????????<br/>
                                    ?????? ???? ?? ?????? ???????? ??????????????<br/>
                                    ???? ?? ?????????????????? ?????????? ???? ??????????<br/>
                                    ?? ???????? ???? ???????????? ????????<br/>
                                    ?? ?????????? ???????? ?? ???????? ????????????<br/>
                                    ?? ?????????? ???????????? ????????<br/><br/>

                                    ?? ???? ???????????????????? ??????????<br/>
                                    ...<br/>
                                    ???????? ?????? ???????????? ????????<br/>
                                    ...<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">????????, ???????? ??????????...</h1> <br/>
                                <p className="texts-paragraf">????????????: ?????????????? ??., ?????????????????? ??. <br/>
                                    ??????????: ???????????? ??. <br/><br/>

                                    ???????????????????? ??????????, ???????? ???? ?????????? ????????????.<br/>
                                    ?????????? ?? ???????????? ?? ??????. ?????????? ??????????.<br/>
                                    ?? ???????????? ?????? ?? ???????????? ???????? ?????????????????? ?????? ????????.<br/>
                                    ???? ?? ???????????? ???????????? - ???????????? ????????????.<br/>
                                    ?????????? ?????? ?? ?????????? ???? ?????????????? ????????????<br/>
                                    ???????????? ?????? ?????? ?? ?????????? ?????? ???????? ?? ??????.<br/>
                                    ?????? ?? ?????? ???? ?????? ?????? ???? ???????????? ??????????,<br/>
                                    ???? ???????????? ?????? ?? ???????????? ?? ???????? ????????????!<br/><br/>

                                    ?????????? ???????????? ??????????, ???????????? ???????? ???? ??????????,<br/>
                                    ???? ???????? ?????????? ???????????? ???????????? ????????????.<br/>
                                    ?????????? ?????? ?? ?????????????? ???? ???????????? ??????????,<br/>
                                    ?? ?????????????? ????????, ???????? ??????????!<br/><br/>

                                    ???? ?????????????? ???????? ?????????? ?? ?????????????? ???????? ????????<br/>
                                    ?? ?????????????? ?? ???????????? ?????? ?????? ?? ????????.<br/>
                                    ?????????? ?????????????????? ??????, ???????? ???? ?????????? ?? ????.<br/>
                                    ?????? ?????????????? ???? ???????????? ?????? ??????????.<br/>
                                    ???????????? ???? ??????????????, ?????????? ???????? ???? ??????,<br/>
                                    ???????????? ?? ???????????? ???????????? ???????? ????????!<br/>
                                    ????, ?????? ?????????? ?? ????????, ?????? ?? ???????????????? ???? ????????<br/>
                                    ?????????????? ?????????? ?????????? ?? ???????? ??????????!<br/><br/>

                                    ?????????? ???????????? ??????????, ???????????? ???????? ???? ??????????,<br/>
                                    ???? ???????? ?????????? ???????????? ???????????? ????????????.<br/>
                                    ?????????? ?????? ?? ?????????????? ???? ???????????? ??????????,<br/>
                                    ?? ?????????????? ????????, ???????? ??????????!<br/>
                                </p>
                            </div>
                        </div>
                        <div className="texts-invoke-btn"><i>????????????</i></div>
                    </div>
                    <div className="offer__slider-counter fun-club-offer__slider-counter">
                        <div className="offer__slider-prev"></div>
                        <div className="counter">
                            <span className="fun-club-offer__slider-counter" id="current">03</span>
                            <span id="total">04</span>
                        </div>
                        <div className="offer__slider-next"></div>
                    </div>
                </div>
                <div className="library">
                    <h3 className="album-name">???????? - ????????????</h3>
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
