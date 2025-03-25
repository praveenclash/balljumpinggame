import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Marquee from "react-fast-marquee";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    FaCircleArrowRight,
    FaCircleArrowLeft,
    FaCircleArrowUp,
    FaCirclePause,
    FaCirclePlay,
} from "react-icons/fa6";

function App() {
    const [play, setPlay] = useState(false);
    const [screen, setScreen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [direction, setDirection] = useState('left');
    const [rotationDirection, setRotationDirection] = useState('+');
    const [countdown, setCountdown] = useState(null);

    const [value, Setvalue] = useState({
        ballRotation: 0,
        bgRotation: 0,
        progressValue: 0,
    });

    const togglePlay = () => {
        if (play) {
            setShowModal(true);
            Setvalue(prevState => ({
                ...prevState,
                progressValue: 10,
                bgRotation: 100,
                ballRotation: 0.8,
            }));
            setPlay(false);
        } else {
            setCountdown(3); // Start countdown
            let counter = 3;
            const countdownInterval = setInterval(() => {
                counter -= 1;
                if (counter > 0) {
                    setCountdown(counter);
                } else {
                    clearInterval(countdownInterval);
                    setCountdown(null);
                    setPlay(true); // Start the game after countdown
                }
            }, 1000);
        }
    };

    const ballPlay = () => {
        setScreen(false);
        setTimeout(() => setScreen(true), 600);
    };

    const leftFun = () => {
        setDirection('right');
        setRotationDirection('-');

        Setvalue(prevState => {
            let newProgressValue = Math.max(0, prevState.progressValue - 10);
            let newBgRotation = newProgressValue === 0 ? 0 : prevState.bgRotation - 50;
            let newBallRotation = newProgressValue === 0 ? 0 : prevState.ballRotation + 0.2;

            return {
                ballRotation: newBallRotation,
                bgRotation: newBgRotation,
                progressValue: newProgressValue,
            };
        });
    };

    const rightFun = () => {
        setDirection('left');
        setRotationDirection('+');

        Setvalue(prevState => {
            let newProgressValue = Math.min(100, prevState.progressValue + 10);
            let newBgRotation = newProgressValue === 0 ? 0 : prevState.bgRotation + 50;
            let newBallRotation = newProgressValue === 0 ? 0 : prevState.ballRotation - 0.8 == 0 ? 1 : 1;

            return {
                ballRotation: newBallRotation,
                bgRotation: newBgRotation,
                progressValue: newProgressValue,
            };
        });
    };

    const style = {
        Marquee: {
            maxWidth: "100%",
            height: "100vh",
            overflow: "hidden",
            position: "relative",
            zIndex: 0,
        },
        bG: {
            position: "relative",
            top: screen ? "-280px" : "-240px",
            zIndex: -10,
            transition: "0.5s linear",
        },
        ball: {
            maxWidth: "13%",
            position: "absolute",
            top: screen ? "75%" : "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            animation: play ? `rotate ${value.ballRotation}s linear infinite` : "none",
            transition: "0.5s linear",
        },
        rightArrow: {
            fontSize: "65px",
            position: "absolute",
            top: "75%",
            left: "14.5%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            cursor: "pointer",
        },
        leftArrow: {
            fontSize: "65px",
            position: "absolute",
            top: "75%",
            left: "6.5%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            cursor: "pointer",
        },
        topArrow: {
            fontSize: "65px",
            position: "absolute",
            top: "65%",
            left: "10.5%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            cursor: "pointer",
        },
        pauseArrow: {
            fontSize: "65px",
            position: "absolute",
            top: "75%",
            right: "10.5%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            cursor: "pointer",
        },
        progressBar: {
            width: "15%",
            height: "15px",
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "black",
            borderRadius: "60px",
            border: "1px solid black",
            overflow: "hidden",
        },
        text: {
            color: "#D4A017",
            position: "absolute",
            top: "17px",
            left: "60%",
            transform: "translateX(-50%)",
        },
        progressBarInner: {
            width: play ? `${value.progressValue}%` : "0",
            height: "100%",
            backgroundColor: "#D4A017",
            transition: "1s linear",
        },
        countdownText: {
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "100px",
            fontWeight: "bold",
            color: "white",
            zIndex: 50,
        },
    };

    return (
        <div className="container-fluid bg-dark w-100 vh-100 m-0 p-0 position-relative">
            <style>
                {`
                    @keyframes rotate {
                        0% { transform: translate(-50%, -50%) rotate(0deg); }
                        100% { transform: translate(-50%, -50%) rotate(${rotationDirection}360deg); }
                    }
                    .arrow-icon {
                        color: white;
                        transition: color 0.3s ease-in-out;
                    }
                    .arrow-icon:hover {
                        color: yellow;
                        scale: 1.02;
                    }
                `}
            </style>

            {countdown !== null && (
                <div style={style.countdownText}>
                    {countdown === 0 ? "Play!" : countdown}
                </div>
            )}

            <Marquee style={style.Marquee} speed={play ? value.bgRotation : 0} direction={direction}>
                <img src="/bg.jpg" alt="Moving Background" style={style.bG} />
            </Marquee>

            <img src="/ball.png" alt="Ball" style={style.ball} />

            <FaCircleArrowLeft className="arrow-icon" style={style.leftArrow} onClick={leftFun} />
            <FaCircleArrowRight className="arrow-icon" style={style.rightArrow} onClick={rightFun} />
            <FaCircleArrowUp className="arrow-icon" style={style.topArrow} onClick={ballPlay} />

            {play ? (
                <FaCirclePause className="arrow-icon" style={style.pauseArrow} onClick={togglePlay} />
            ) : (
                <FaCirclePlay className="arrow-icon" style={style.pauseArrow} onClick={togglePlay} />
            )}

            <div style={style.progressBar}>
                <div style={style.progressBarInner}></div>
            </div>
            <h2 style={style.text}>{value.progressValue}%</h2>
        </div>

        
    );
}

export default App;
