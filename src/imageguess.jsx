import React, { useState } from 'react';
import './imageguess.css'
import enWordArr from '../words(en)';

const APIkey = 'caailYVBDQ7hpb4Ls9S49MSR0NrCdykg';

const wordArr = ['bear', 'fox', 'turtle', 'flamingo'];

function ImageGuess() {

    const [currentWord, setCurrentWord] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [playerControl, setPlayerControl] = useState('hidden');
    const [startButton, setStartButton] = useState('Start');
    const [gameFeedback, setGameFeedback] = useState('');

    const startGame = () => {

        const randomIndex = Math.floor(Math.random() * enWordArr.length);
        const randomWord = enWordArr[randomIndex];

        setCurrentWord(randomWord);
        setPlayerControl('visible');
        setStartButton('Restart');
        
    

        const queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${randomWord}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        fetch(queryURL)

        .then((response) => 
            // return 
            response.json())
        .then((data) => {
        // console.log(data.data[0]['images']['original']['url']);
        setImageURL(data.data[0]['images']['original']['url']);
        });

    };

    const checkWord = () => {

        const userAnswer = document.getElementById('playerInput').value;

        // console.log(userAnswer);

        if (userAnswer === currentWord) {
            setGameFeedback(currentWord + ' is correct!');
            setTimeout(() => {
                // nextQuestion();
                startGame();
                setGameFeedback('');
              }, "2000");
        }   else {
                setGameFeedback('Try again!')
            };
    };


    return (

        <div className="gameMain">

            <h1 className="mb-5">Let the games begin...</h1>

            <div id="gameBox">

                <div id="imageBox">
                    {imageURL && <img src={imageURL} alt="Giphy" />}
                </div>

                {/* <div id="wordBox">{currentWord}</div> */}

                <div id="guessBox" className="mt-5">

                    <div className="gameFeedback my-5">

                        {gameFeedback}

                    </div>

                    <div id="playerControl" className={playerControl}>

                        <input id="playerInput" type="type" />
                        <button onClick={checkWord} id="answerSubmit">Enter</button>

                    </div>

                </div>
                
            </div>

            <button onClick={startGame} className="mt-5" >{startButton}</button>

        </div>
    );
}

export default ImageGuess;